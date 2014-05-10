FUSION         = 0;
FUSION_CORDOVA = 1;

// This function requires network information plugin in your cordova project: 
//   cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git
//
function hasNetworkConnection() {
	if(navigator && navigator.connection) {
		// under cordova
		return navigator.connection.type != Connection.NONE;
	} else {
		// without cordova (?)
		return true;
	}
}

function runScript(scriptSource) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.text = scriptSource;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

function loadScriptFromURL(scriptURL, scriptName, candidate) {
	var request = new XMLHttpRequest();
	request.open('GET', scriptURL, false);
	request.send(null);
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

startFusion = function(appURL, fusionMethod) {
	var url = appURL;
	if(url.charAt(url.length - 1) != '/') {
		url = url + "/";
	}

	if(typeof(fusionMethod) == 'undefined' || fusionMethod == FUSION) {
		url = url + "fusion";
		loadScript(url, "fusion");
	}

	if(fusionMethod == FUSION_CORDOVA) {
		url = url + "fusion-cordova";
		loadScript(url, "fusion_cordova");
	}
}
