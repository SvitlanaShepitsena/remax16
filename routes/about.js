var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function aboutUs(express) {

    var aboutUsRouter = express.Router();

    aboutUsRouter.get('/:aboutContent', function (req, res, next) {

        var userAgent = req.get('user-agent');

        var aboutContent = req.params.aboutContent;

        var fullUrl = (req.protocol || 'http') + '://' + req.get('host') + req.originalUrl;

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
                    url: fullUrl
                }
            };
            res.render('about', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    aboutUsRouter.use(express.static(appFolder));

    aboutUsRouter.get('/:aboutContent?', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return aboutUsRouter;

};
