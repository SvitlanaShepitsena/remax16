var os = require("os");
var appRoot = require('app-root-path');
module.exports = function (startDir) {
    var user = process.env.USER;
    //if (true) {
    if (!(user === 'ec2-user' || user === 'root')) {
        return appRoot + '/app';
    } else {
        return appRoot + '/build';
    }
};


