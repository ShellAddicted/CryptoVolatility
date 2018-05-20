var audio = new Audio('media/audio/sound.mp3');
var userAlerted = false;

function updatePrice(price){
	if (isNaN(price)){
		return;
	}
	price = parseFloat(price);
	console.log(price);
	console.log(userAlerted)
	document.getElementById("currentPrice").innerHTML = parseFloat(price) + "$";

	var userThreshold = document.getElementById("thresholdBox").value;
	if (isNaN(userThreshold)){
		return;
	}

	if (!userAlerted && parseFloat(price) > parseFloat(userThreshold)){
		audio.play();
		userAlerted = true;
	}
	else if (userAlerted && parseFloat(price) < parseFloat(userThreshold)){
		userAlerted = false;
	}
}

function retrievePage(url, callback){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(req.responseText);
		}
	};
	req.open("GET", url, true);
	req.send(null);
}

function coincapRequest(url){
	retrievePage(url, function(response){
		try{
			var data = JSON.parse(response);
			updatePrice(data.price);
		}
		catch(err){
			console.log(err);
		}
	});
}

function apiRequest(){
	cryptoCurrency = document.querySelector(".currenciesArea > label > input:checked").value;
	coincapRequest("https://coincap.io/page/" + cryptoCurrency.toUpperCase());
}

apiRequest();
var autoUpdate = window.setInterval(apiRequest, 1000);