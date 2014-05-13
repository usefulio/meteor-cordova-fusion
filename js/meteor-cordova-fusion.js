document.addEventListener("deviceready", function() { if(Session) Session.set("DEVICE_READY", true); }, false);

// This function requires network information plugin in your cordova project: 
//   cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
//
function hasNetworkConnection() {
	if(navigator && navigator.connection && typeof(Connection) != "undefined") {
		// under cordova with network information plugin
		return navigator.connection.type != Connection.NONE;
	} else {
		// without cordova or network information plugin
		return true;
	}
}

function runScript(scriptSource) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.innerHTML = scriptSource;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

function insertScript(scriptURL) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = scriptURL;
	script.async = false;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);	
}

function loadScriptFromURL(scriptURL, scriptName, candidate) {
	var request = new XMLHttpRequest();
	try {
		request.open('GET', scriptURL, false);
		request.send(null);

	} catch(e) {
		console.log(e.message);
	}

	if (request.status === 200) {
		scriptSource = request.responseText;
		window.localStorage.setItem(scriptName, scriptSource);
		runScript(scriptSource);
	} else {
		if(candidate) {
			console.log('Error ' + request.status + ' ' + request.statusText);
			runScript(candidate);
		}
	}
}

function loadScript(scriptURL, scriptName) {
	var scriptSource = window.localStorage.getItem(scriptName);
	if(!scriptSource || hasNetworkConnection()) {
		loadScriptFromURL(scriptURL, scriptName, scriptSource);
	} else {
		runScript(scriptSource);
	}
}

startFusion = function(appURL) {
	var cordovaURL = "";
	if(window.location.href.slice(-1) == "/") {
		cordovaURL = window.location.href + "cordova.js";
	} else {
		var tmp = window.location.href.split('/');
		cordovaURL = window.location.href.replace(tmp[tmp.length - 1], 'cordova.js');		
	}

	var url = appURL;
	if(url.charAt(url.length - 1) != '/') {
		url = url + "/";
	}

	loadScript(url + "fusion", "fusion");
	insertScript(cordovaURL);
}
