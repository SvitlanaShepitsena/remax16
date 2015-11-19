var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function about(express) {

    var aboutRouter = express.Router();

    aboutRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: constants.aboutPageTitle,
                og: {
                    title: constants.aboutPageTitle,
                    description: constants.aboutPageDescription,
                    image: 'https://s3-us-west-2.amazonaws.com/remax1stclass/company-logo.png',
                    url: rootUrl
                }
            };
            res.render('about', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    aboutRouter.use(express.static(appFolder));

    aboutRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return aboutRouter;

};
