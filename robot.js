(function(ext) {
    // Default step duration: 500ms = 0.5s
    var STEP_DURATION = 500;

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

    ext.step_forward = function() {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"move_backward");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, STEP_DURATION);
    };

    ext.step_backward = function() {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"move_forward");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, STEP_DURATION);
    };

    ext.turn_right = function() {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"turn_right");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, STEP_DURATION);
    };

    ext.turn_left = function() {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"turn_left");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, STEP_DURATION);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'step forward', 'step_forward'],
            [' ', 'step backward', 'step_backward'],
            [' ', 'turn left', 'turn_left'],
            [' ', 'turn right', 'turn_right']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Robotics extension', descriptor, ext);
})({});
