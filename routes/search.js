var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function search(express) {

    var searchRouter = express.Router();

    searchRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: constants.searchPageTitle,
                og: {
                    title: constants.searchPageTitle,
                    description: constants.searchPageDescription,
                    image: 'https://s3-us-west-2.amazonaws.com/remax1stclass/company-logo.png',
                    url: rootUrl
                }
            };
            res.render('search', {vm: vm});
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    searchRouter.use(express.static(appFolder));

    searchRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return searchRouter;

};
