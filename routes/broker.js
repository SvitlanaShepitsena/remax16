var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function brokers(express) {

    var brokerRouter = express.Router();

    brokerRouter.get('/:brokerId/profile', function (req, res, next) {
        var brokerId = req.params.brokerId;
        console.log('we are in broker');

        var userAgent = req.get('user-agent');
        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
            var vm = {
                rootUrl: rootUrl,
                title: constants.brokersPageTitle,
                image: constants.defaultThumb,
                defAvatar: constants.defaultBrokerIcon,
                companyPhone: constants.companyPhone,
                companyFax: constants.companyFax,
                og: {
                    title: constants.brokersPageTitle,
                    description: constants.brokersPageDescription,
                    image: constants.defaultThumb,
                    url: rootUrl
                }
            };


            var brokerUrl = constants.url + 'homes/agents/' + brokerId;
            var homesSaleUrl = constants.url + 'homes/sale';
            firebaseServ.getAll(brokerUrl).then(function (broker) {
                var brokerHomes = [];
                firebaseServ.getAll(homesSaleUrl).then(function (homes) {

                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        if (home.brokerId === brokerId) {
                            brokerHomes.push(home)
                        }
                    }
                    broker.listings = brokerHomes;
                    vm.broker = broker;

                    res.render('broker', {vm: vm});

                }, function (Error) {
                    console.log(Error);

                });


            }, function (Error) {
                console.log(Error);

            });
            /*create a view-model for fb crawler*/


        } else {
            next();

        }
    });

    ///*Redirect user to AngularJs App*/
    //var appFolder = require('./dirServ')();
    //brokersRouter.use(express.static(appFolder));
    //
    //brokersRouter.get('/', function (req, res) {
    //    res.sendFile('index.html', {root: appFolder});
    //});
    return brokerRouter;

};
