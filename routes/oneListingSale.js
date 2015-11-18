var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');

var defaultThumb = require('../services/const').defaultThumb;
module.exports = function oneListingSale(express) {
    var oneListingSaleRouter = express.Router();
    oneListingSaleRouter.get('/:mls', function (req, res, next) {
        var mls = req.params.mls;
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var fullUrl = rootUrl + req.originalUrl;

        if (userAgentServ.amIBot(userAgent)) {
            var homeUrl = constants.url + 'homes/sale/' + mls;
            firebaseServ.getItem(homeUrl).then(function (home) {
                /*og listing properties*/
                home.img = home.images ? home.images[0] : defaultThumb;
                home.address = home.street + ', ' + home.city + ', ' + home.state + ', ' + home.zip;
                home.description = home.type + ': Price: ' + home.price + home.beds + 'beds,' + home.bath + 'baths, in' + home.address.city;
                var vm = {
                    url: fullUrl,
                    title: home.address,
                    og: {
                        url: fullUrl,
                        title: home.address,
                        description: 'Check out and schedule a showing for a ' + home.description,
                        image: home.img
                    }
                };
                vm.home = home;
                vm.og = {
                    url: fullUrl,
                    title: home.address,
                    description: 'Check out and schedule a showing for a ' + home.description,
                    image: home.img
                }
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

    oneListingSaleRouter.get('/:mls/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneListingSaleRouter;

};
