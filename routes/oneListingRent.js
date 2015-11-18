var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');
var Money = require('../services/Money');
var userAgentServ = require('../services/UserAgentServ');
var defaultThumb = require('../services/const').defaultThumb;

module.exports = function oneListingRent(express) {

    var oneListingRentRouter = express.Router();

    oneListingRentRouter.get('/:mls', function (req, res, next) {
        var mls = req.params.mls;
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

        var homeUrl = constants.url + 'homes/rent/' + mls;
        var fullUrl = rootUrl + req.originalUrl;

        if (userAgentServ.amIBot(userAgent)) {
            firebaseServ.getItem(homeUrl).then(function (home) {
                /*og listing properties*/
                home.fullPrice = Money.format(home.price);
                home.fullAddress = home.address.street + ', ' + home.address.city + ', ' + home.address.state + ' ' + home.address.zip;

                home.img = home.images ? home.images[0] : defaultThumb;
                home.fullTitle = 'Re/Max 1st Class ☆ ' + home.type + ' FOR RENT! ☆ ' + home.fullPrice + ' ☆ ' + home.fullAddress;
                home.fullDescription = '✔ Check out and schedule a showing!  ☏  ' + home.description;
                var vm = {
                    url: fullUrl,
                    title: home.fullTitle,
                    image: home.img,
                    og: {
                        url: fullUrl,
                        title: home.fullTitle,
                        description: home.fullDescription,
                        image: home.img
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

    oneListingRentRouter.get('/:mls', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneListingRentRouter;

};
