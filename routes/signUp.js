var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function signUp(express) {

    var signUpRouter = express.Router();

    signUpRouter.get('/', function (req, res, next) {
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {
            /*create a view-model for fb crawler*/
            var vm = {
                url: rootUrl,
                title: constants.homePageTitle,
                description: constants.homePageDescription,
                image: constants.companyLogoFb,
                og: {
                    title: constants.homePageTitle,
                    description: constants.homePageDescription,
                    image: constants.companyLogoFb,
                    url: rootUrl,
                }
            };
            res.render('sign-up', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    signUpRouter.use(express.static(appFolder));

    signUpRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return signUpRouter;

};
