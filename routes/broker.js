var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function brokers(express) {

    var brokerRouter = express.Router();

    brokerRouter.get('/:brokerId/:param', function (req, res, next) {
        var brokerId = req.params.brokerId;
        var param = req.params.param;
        console.log(brokerId);

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
                dTitle: constants.defaultBrokerTitle,
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
                broker.id = brokerId;
                var brokerHomes = [];
                firebaseServ.getAll(homesSaleUrl).then(function (homes) {
                    //console.log(homes);
                    for (var mls in homes) {
                        var home = homes[mls];
                        if (home.agent == brokerId) {
                            brokerHomes.push(home)
                        }
                    }
                    broker.listings = brokerHomes;
                    vm.broker = broker;
                    //console.log(brokerHomes);
                    switch (param) {
                        case 'profile':
                            res.render('broker-profile', {vm: vm});
                            break;
                        case 'listings':
                            res.render('broker-listings', {vm: vm});
                            break;
                        case 'blogs':
                            firebaseServ.getAllFilter(constants.url+'blog', function (array) {
                                return _.where(array,{brokerId:brokerId});

                            }).then(function (brokerBlogs) {
                                console.log(brokerBlogs);
                                vm.broker.blogs=brokerBlogs
                            res.render('broker-blogs', {vm: vm});
                            });
                            break;
                        case 'reviews':
                            res.render('broker-reviews', {vm: vm});
                            break;
                        case 'endorsements':
                            res.render('broker-endorsements', {vm: vm});
                            break;

                        default:
                            res.render('broker-profile', {vm: vm});
                    }
                    if (param == 'profile') {
                    }

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
