var path = require('path');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function search(express) {

    var searchRouter = express.Router();

    searchRouter.get('/:saleRent', function (req, res, next) {
        var fbSaleRent = req.params.saleRent.indexOf('sale') > -1 ? 'sale' : 'rent';
        var fbUrl = constants.url + 'homes/' + fbSaleRent;


        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
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
            firebaseServ.getAll(fbUrl).then(function (homes) {
                console.log(homes);
                vm.homes = homes;
                res.render('search', {vm: vm});

            }, function (Error) {
                console.log(Error);

            });
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
