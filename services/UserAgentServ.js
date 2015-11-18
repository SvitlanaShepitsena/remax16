var botDetect = require('botDetect');

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
        //for (var i = 0; i < bots.length; i++) {
        //    var bot = bots[i].toLowerCase();
        //    if (userAgent.toLowerCase().indexOf(bot) > -1) {
        //        return true;
        //    }
        //}
        //return false;
        return botDetect(userAgent);
    }
}
