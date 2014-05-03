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

function loadScriptFromURL(scriptURL, successCallback, errorCallback) {
	var request = new XMLHttpRequest();

	request.onload = function() {
		if(request.readyState === 4) {
			if(request.status === 200) {
				successCallback(request.responseText);
			} else {
				errorCallback(request.statusText);
			}
		}
	}

	request.onerror = function() {
		errorCallback(request.statusText || "Unknown error.");
	}

	request.open("GET", scriptURL, true);
	request.send(null);
}

function loadScript(scriptURL, scriptName) {
	var scriptSource = window.localStorage.getItem(scriptName);

	function successCallback(data) {
		scriptSource = data;
		window.localStorage.setItem(scriptName, scriptSource);
		runScript(scriptSource);
	}

	function errorCallback(message) {
		if(scriptSource) {
			runScript(scriptSource);
		} else {
			console.log(message);
		}
	}

	if(!scriptSource || hasNetworkConnection()) {
		loadScriptFromURL(scriptURL, successCallback, errorCallback);		
	}
	else
	{
		runScript(scriptSource);
	}
}

startFusion = function(appURL, usingAppCache) {
	var url = appURL;
	if(url.charAt(url.length - 1) != '/') {
		url = url + "/";
	}

	if(typeof(usingAppCache) == 'undefined' || usingAppCache) {
		url = url + "fusion";
		loadScript(url, "fusion");
	} else {
		url = url + "fusion-no-appcache";
		loadScript(url, "fusion_no_appcache");
	}
}
