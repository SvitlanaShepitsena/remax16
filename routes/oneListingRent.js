var path = require('path');
var constants = require('../services/const');
var userAgentServ = require('../services/UserAgentServ');
var firebaseServ = require('../services/FirebaseServ');

var defaultThumb = require('../services/const').defaultThumb;

module.exports = function oneListingRent(express) {
    var oneListingRentRouter = express.Router();
    oneListingRentRouter.get('/:mls', function (req, res, next) {
        var mls = req.params.mls;
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var fullUrl = rootUrl + req.originalUrl;
        var homeUrl = constants.url + 'homes/rent/' + mls;

        if (userAgentServ.amIBot(userAgent)) {
            firebaseServ.getItem(homeUrl).then(function (home) {
                home.img = home.images ? home.images[0] : defaultThumb;
                home.fullTitle = 'Re/Max 1st Class ☆ ' + home.type + ' FOR RENT! ☆ ' + home.fullPrice + ' ☆ ' + home.fullAddress;
                home.fullDescription = '✔ Check out and schedule a showing!  ☏  ' + home.description;
                var vm = {
                    url: fullUrl,
                    title: home.fullTitle,
                    description: home.fullDescription,
                    image: home.img,
                    og: {
                        url: fullUrl,
                        title: home.fullTitle,
                        description: home.fullDescription,
                        image: home.img,
                    }
                };
                vm.home = home;
                res.render('one-listing', {vm: vm});

            }, function (Error) {
                console.log(Error);
            });
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    oneListingRentRouter.use(express.static(appFolder));

    oneListingRentRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneListingRentRouter;

};
