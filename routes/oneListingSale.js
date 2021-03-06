var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');
var Money = require('../services/Money');
var defaultThumb = require('../services/const').defaultThumb;

module.exports = function oneListingSale(express) {
    var oneListingSaleRouter = express.Router();
    oneListingSaleRouter.get('/:mls', function (req, res, next) {
        var mls = req.params.mls;
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var fullUrl = rootUrl + req.originalUrl;
        var homeUrl = constants.url + 'homes/sale/' + mls;

        if (userAgentServ.amIBot(userAgent)) {
            firebaseServ.getItem(homeUrl).then(function (home) {
                /*og listing properties*/
                home.fullPrice = Money.format(home.price);
                home.fullAddress = home.address.street + ', ' + home.address.city + ', ' + home.address.state + ' ' + home.address.zip;

                home.img = home.images ? home.images[0] : defaultThumb;
                home.fullTitle = 'Re/Max 1st Class ☆ ' + home.type + ' FOR SALE! ☆ ' + home.fullPrice + ' ☆ ' + home.fullAddress;
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
                console.log(Error.message);
            });
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    oneListingSaleRouter.use(express.static(appFolder));

    oneListingSaleRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneListingSaleRouter;

};
