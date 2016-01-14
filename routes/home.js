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
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

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
                    url: rootUrl
                }
            };
            var blogsUrl = url + 'blogs';
            firebaseServ.getAll(blogsUrl).then(function (blogs) {
                console.log(blogs);
                vm.blogs = homepageRenderServ.process(blogs);
                res.render('home', {vm: vm});

            }, function (Error) {
                console.log(Error);

            });
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/

    var appFolder = require('./dirServ')();
    console.log(appFolder);
    homeRouter.use(express.static(appFolder));

    homeRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return homeRouter;

};
