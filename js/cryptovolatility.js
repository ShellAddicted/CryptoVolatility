var audio = new Audio('media/audio/sound.mp3');
var userAlerted = false;

function updatePrice(price){
	if (isNaN(price)){
		return;
	}
	price = parseFloat(price);
	console.log(price);
	document.getElementById("currentPrice").innerHTML = parseFloat(price) + "$";

	var userThreshold = document.getElementById("thresholdBox").value;
	if (isNaN(userThreshold)){
		return;
	}

	if (parseFloat(price) > parseFloat(userThreshold) && !userAlerted){
		audio.play();
		userAlerted = true;
	}
	else{
		userAlerted = false;
	}
}

function apiRequest(){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			try{
				var data = JSON.parse(req.responseText);
				updatePrice(data.price);
			}
			catch(err){
				console.log(err);
			}
			
		}
	};
	req.open("GET", "http://coincap.io/page/BTC", true);
	req.send(null);
}

apiRequest();
var autoUpdate = window.setInterval(apiRequest, 1000);