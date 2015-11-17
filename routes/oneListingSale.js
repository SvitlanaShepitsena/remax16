var path = require('path');
var constants = require('../services/const');

var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function oneListingSale(express) {

    var oneListingSaleRouter = express.Router();

    oneListingSaleRouter.get('/:mls', function (req, res, next) {
        var mls = req.params.mls;

        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: constants.oneListingSaleTitle,
                og: {
                    title: constants.oneListingSaleTitle,
                    description: constants.oneListingSaleDescription,
                    image: 'https://s3-us-west-2.amazonaws.com/remax1stclass/company-logo.png',
                    url: rootUrl
                }
            };


            var homeUrl = constants.url + 'homes/sale/'+mls;
            firebaseServ.getItem(homeUrl).then(function (home) {
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
    oneListingSaleRouter.use(express.static(appFolder));

    oneListingSaleRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneListingSaleRouter;

};
