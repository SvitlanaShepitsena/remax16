var path = require('path');
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');
var homepageRenderServ = require('../services/HomepageRenderServ');

var constants = require('../services/const');
var url = require('../services/const').url;

module.exports = function homeRouter(express) {
    var homeRouter = express.Router();

    homeRouter.get('/', function (req, res, next) {
        var userAgent = req.get('user-agent');
        console.log(userAgent);

        if (userAgentServ.amIBot(userAgent)) {
            /*create a view-model for fb crawler*/

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            console.log(rootUrl);
            var vm = {
                rootUrl: rootUrl,
                title: constants.homePageTitle,
                og: {
                    title: constants.homePageTitle,
                    description: constants.homePageDescription,
                    image: rootUrl + '/img/logo/company-logo-fb.jpg',
                    url: constants.url
                }
            };

            var postsUrl = 'https://svet.firebaseio.com/articles';
            console.log('test');
            firebaseServ.getAll(postsUrl).then(function (news) {
                console.log(news);
                vm.homeNews = homepageRenderServ.process(news);
                res.render('home', {vm: vm});

            }, function (Error) {

            });
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/

    var appFolder =require('./dirServ')();
    homeRouter.use(express.static(appFolder));

    homeRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return homeRouter;

};
