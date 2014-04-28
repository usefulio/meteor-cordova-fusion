Meteor + Cordova + appcache: online and offline
===============================================

This is example Cordova project which injects Meteor application into Cordova's index.html. Application is stored in appcache and can be executed even if your mobile device is offline.

Usage
-----

Add **appcache** package to your meteor application:

	meteor add appcache

Add [fusion](https://github.com/usefulio/meteor-fusion) package to your meteor application:

	mrt add fusion

This will add server side route to your application: "your_app_url/fusion"

Deploy your application somewhere, for example:

	meteor deploy your_app.meteor.com

In your cordova project add network information plugin:

	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git

Add "meteor-cordova-fusion.js" to your cordova project (usually to "www/js/" directory)

Edit your cordova "www/index.html"

	<!DOCTYPE html>
	<html>
    	<head>
        	<title>Hello World</title>
			<script type="text/javascript" charset="utf-8" src="js/meteor-cordova-fusion.js"></script>
			<script type="text/javascript" charset="utf-8" src="cordova.js"></script>
    	</head>
		<body onload="onLoad()">
			<script>
				// change this - put your application URL
				var applicationURL = "http://famous-experiment1.meteor.com";

				function onLoad() {
					document.addEventListener("deviceready", onDeviceReady, false);
				}

				function onDeviceReady() {
					startFusion(applicationURL);
				}
			</script>
		</body>
	</html>

Change variable `applicationURL` to your meteor application URL (e.g. `your_app.meteor.com`)

Build and run your cordova project while device is online. Now turn off your device internet connection and start application - voilla: It works!

How it works?
-------------

When you start application in your mobile device, onDeviceReady event will execute startFusion function. It checks if device is online and: 

- If device is online: fusion script is loaded from server, stored into localStorage and executed.

- If device is offline: fusion script is loaded from localStorage and executed.

Fusion script will load your meteor application files. They are cached, so will be loaded from HTML5 appcache.

If you change your meteor application at server, your fusion script will change, and next execution when device is online will fetch new fusion script (and new meteor app files) from server.


That's it :)
