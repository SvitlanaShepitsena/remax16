var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function terms(express) {

    var termsRouter = express.Router();

    termsRouter.get('/', function (req, res, next) {
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

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
            res.render('terms', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    termsRouter.use(express.static(appFolder));

    termsRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return termsRouter;

};
