var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function login(express) {

    var loginRouter = express.Router();

    loginRouter.get('/', function (req, res, next) {
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
            res.render('login', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    loginRouter.use(express.static(appFolder));

    loginRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return loginRouter;

};
