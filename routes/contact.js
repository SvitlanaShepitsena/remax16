var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function contactUs(express) {

    var contactUsRouter = express.Router();

    contactUsRouter.get('/', function (req, res, next) {
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

            res.render('contact', {vm: vm});
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    contactUsRouter.use(express.static(appFolder));

    contactUsRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return contactUsRouter;

};
