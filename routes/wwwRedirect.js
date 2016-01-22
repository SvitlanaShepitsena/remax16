module.exports = function (express) {
    console.log('herer');
    var router = express.Router();

    router.get('*',function (req, res, next) {
        var host = req.get('host');

        var protocol = req.protocol;
        var url = req.originalUrl;
        var slsh = '://';

        if (host.indexOf('localhost')>-1 || host.match(/^www\..*/i)) {
            next();
        } else {
            var fullPath = protocol + slsh + 'www.' + host + ':' + url;
            res.redirect(fullPath);
        }
    });
    return router;
};

