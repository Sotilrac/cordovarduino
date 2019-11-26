const serialport = require('serialport');
var port = null;

var serial = {
    requestPermission: function(opts, successCallback, errorCallback) {
        if (typeof opts === 'function') { //user did not pass opts
            errorCallback = successCallback;
            successCallback = opts;
            opts = {};
        }
        // ignores asking for permission and always runs success.
        successCallback();
    },
    open: function(opts, successCallback, errorCallback) {
        port = serialport(opts["device"], opts, function() {
            console.log("Attemped to open serial port.");
            if (port.isOpen) {
                successCallback();
            } else {
                errorCallback();
            }
        });
    },
    write: function(data, successCallback, errorCallback) {
        if (port.isOpen) {
            port.write(data, 'ascii', function() {
                successCallback();
            });
        } else {
            errorCallback();
        }
    },
    writeHex: function(hexString, successCallback, errorCallback) {
        if (port.isOpen) {
            port.write(data, 'hex', function() {
                successCallback();
            });
        } else {
            errorCallback();
        }
    },
    read: function(successCallback, errorCallback) {
        var val = port.read(1);
        if (val != null) {
            successCallback(val);
        } else {
            errorCallback();
        }
    },
    close: function(successCallback, errorCallback) {
        port.close(successCallback, errorCallback);
    },
    registerReadCallback: function(successCallback, errorCallback) {
        var val = port.read(1);
        while (val != null) {
            successCallback(val);
            val = port.read(1);
        } else {
            errorCallback();
        }
    }
};
module.exports = serial;
