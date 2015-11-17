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
                rootUrl: rootUrl,
                homeAvatar: constants.defaultTransparentThumb,
                title: constants.searchPageTitle,
                og: {
                    title: constants.searchPageTitle,
                    description: constants.searchPageDescription,
                    image: 'https://s3-us-west-2.amazonaws.com/remax1stclass/company-logo.png',
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
