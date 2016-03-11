(function(ext) {
    // Default step duration: 0.5s
    var STEP_DURATION = 0.5;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Asynchronous HTTP Get Request
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    ext.step_forward = function(duration) {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"move_backward");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, duration*1000);
    };

    ext.step_backward = function(duration) {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"move_forward");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, duration*1000);
    };

    ext.turn_right = function(duration) {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"turn_right");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, duration*1000);
    };

    ext.turn_left = function(duration) {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"turn_left");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, duration*1000);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'move forward for %n seconds', 'move_forward', STEP_DURATION],
            [' ', 'move backward for %n seconds', 'move_backward', STEP_DURATION],
            [' ', 'turn left for %n seconds', 'turn_left', STEP_DURATION],
            [' ', 'turn right for %n seconds', 'turn_right', STEP_DURATION]
        ]
    };

    // Register the extension
    ScratchExtensions.register('Robotics extension', descriptor, ext);
})({});
