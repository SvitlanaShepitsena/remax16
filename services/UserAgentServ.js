'use strict';

var fs = require('fs');
// Read bot list from user-agents.org
var botlist = require('./botlist.json');
// Read custom bot list

var ua_list = {};

var loadBotList = function (callback) {
    ua_list = botlist;
    callback(null);
}

var uaCount = function (callback) {
    callback(Object.keys(ua_list).length);
}

loadBotList(function () {
    uaCount(function (count) {
        if (count === 0) {
            console.log("WARNING: No bot list loaded.  Bot list count is 0");
        } else {
            console.log("Bot detector loaded.  Bot list count: " + count);
        }
    });
});
var bots = [
    'facebook',
    'google',
    'Bing',
    'yahoo',
    'twitter',
    'baidu',
    'aol',
    'yandex',
    'vk.com',
    'sitemaps'
]
module.exports = {
    amIBot: function (userAgent) {
        if (!userAgent) {
            return false;
        }

        //if (ua_list[userAgent]) {
        //    return true;
        //}
        //return false;
        for (var i = 0; i < bots.length; i++) {
            var bot = bots[i].toLowerCase();
            if (userAgent.toLowerCase().indexOf(bot) > -1) {
                return true;
            }
        }
        return false;
    }
}
