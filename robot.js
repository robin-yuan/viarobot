/*jslint browser: true*/
/*global $, ScratchExtensions */
"use strict";
(function (ext) {
    // Default step duration: 0.5s
    var STEP_DURATION = 0.5,
        API_BASE_URL = "http://192.168.0.1:8080/?action=command&command=",

        // Asynchronous HTTP Get Request
        httpGetAsync = function (theUrl, callback) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    callback(xmlHttp.responseText);
                }
            };
            xmlHttp.open("GET", theUrl, true); // true for asynchronous
            xmlHttp.send(null);
        },

        sendMove = function (command, duration) {
            httpGetAsync(API_BASE_URL + command);
            if (duration) {
                setTimeout(function () {
                    httpGetAsync(API_BASE_URL + "stop");
                }, duration * 1000);
            }
        },

        // Block and block menu descriptions
        descriptor = {
            blocks: [
                ['w', 'move forward for %n seconds', 'move_forward', STEP_DURATION],
                ['w', 'move backward for %n seconds', 'move_backward', STEP_DURATION],
                ['w', 'turn left for %n seconds', 'turn_left', STEP_DURATION],
                ['w', 'turn right for %n seconds', 'turn_right', STEP_DURATION]
            ]
        };

    ext.move_forward = function (duration) {
        sendMove("move_backward", duration);
    };

    ext.move_backward = function (duration) {
        sendMove("move_forward", duration);
    };

    ext.turn_right = function (duration) {
        sendMove("turn_right", duration);
    };

    ext.turn_left = function (duration) {
        sendMove("turn_left", duration);
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function () {
        sendMove("stop");
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    // Register the extension
    ScratchExtensions.register('Robotics extension', descriptor, ext);
})({});
