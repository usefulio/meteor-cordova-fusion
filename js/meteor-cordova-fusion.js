// this function requires: cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
function hasNetworkConnection() {
    return navigator.connection.type != Connection.NONE;
}

function runScript(scriptSource) {
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.innerHTML = scriptSource;
	document.head.appendChild(s);
}

function loadScriptFromURL(scriptURL, callback) {
	var request = new XMLHttpRequest();
	request.onload = callback;
	request.open("get", scriptURL, true);
	request.send();
}

function loadScript(scriptURL, scriptName) {
	function runCallback() {
		var scriptSource = this.responseText;
		window.localStorage.setItem(scriptName, scriptSource);
		runScript(scriptSource);
	}

	var scriptSource = window.localStorage.getItem(scriptName);
	if(!scriptSource || hasNetworkConnection())
		loadScriptFromURL(scriptURL, runCallback);
	else
		runScript(scriptSource);
}

startFusion = function(appURL) {
	var url = appURL;
	if(url.charAt(url.length - 1) != '/') {
		url = url + "/";
	}
	url = url + "fusion";

	loadScript(url, "fusion_init");
}
