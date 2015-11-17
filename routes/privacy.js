var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function privacy(express) {

    var privacyRouter = express.Router();

    privacyRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: constants.privacyPageTitle,
                og: {
                    title: constants.privacyPageTitle,
                    description: constants.privacyPageDescription,
                    image: 'https://s3-us-west-2.amazonaws.com/remax1stclass/company-logo.png',
                    url: rootUrl
                }
            };
            res.render('privacy', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    privacyRouter.use(express.static(appFolder));

    privacyRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return privacyRouter;

};
