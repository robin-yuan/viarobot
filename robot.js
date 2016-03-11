(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    ext.my_first_block = function() {
        httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"move_backward");
        setTimeout(function() {
            httpGetAsync("http://192.168.0.1:8080/?action=command&command="+"stop");
        }, 1000);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'my first block', 'my_first_block']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Robotics extension', descriptor, ext);
})({});
