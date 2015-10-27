var os = require("os");
module.exports = function (startDir) {
    var user = process.env.USER;
    var preCursor = '';
    if (startDir) {
        if (startDir.indexOf('routes')) {
            preCursor = '../'
        }
    }
    var isDev = false;
    //if (true) {
    return preCursor + '../app';
    //if (user === 'ec2-user') {
    //    return preCursor + '../build';
    //} else {
    //    //if (true) {
    //    if (process.env.NODE_ENV === 'dev') {
    //        console.log('devvv');
    //        return preCursor + '../app';
    //    } else {
    //        console.log('no');
    //        return preCursor + '../build';
    //    }
    //}
};

