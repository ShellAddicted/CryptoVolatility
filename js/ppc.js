function ppcRequest(url){
	retrievePage(url, function(response){
		try{
			console.log(response);
			dc = new DOMParser().parseFromString(response,"text/html");
			dq = document.getElementsByClassName("ppc-usd");

			/*[0].getElementsByTagName("strong")[0].innerHTML;*/
			console.log(dq);

		}
		catch(err){
			console.log(err);
		}
	});
}