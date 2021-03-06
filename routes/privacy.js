var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function privacy(express) {

    var privacyRouter = express.Router();

    privacyRouter.get('/', function (req, res, next) {
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {
            var vm = {
                url: rootUrl,
                title: constants.homePageTitle,
                description: constants.homePageDescription,
                image: constants.companyLogoFb,
                og: {
                    title: constants.homePageTitle,
                    description: constants.homePageDescription,
                    image: constants.companyLogoFb,
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
