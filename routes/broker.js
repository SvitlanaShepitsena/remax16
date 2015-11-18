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


            var brokerUrl = constants.url + 'homes/agents/' + brokerId;
            var homesSaleUrl = constants.url + 'homes/sale';

            firebaseServ.getAll(brokerUrl).then(function (broker) {
                var vm;
                broker.id = brokerId;
                var brokerHomes = [];

                vm = {
                    title: broker.fName + ' ' + broker.lName + '\r\n Real Estate Agent',
                    image: broker.pic || constants.defaultThumb,
                    url: fullUrl + req.originalUrl,

                    og: {
                        title: broker.fName + ' ' + broker.lName + '\r\n Real Estate Agent',
                        image: broker.pic || constants.defaultThumb,
                        url: rootUrl + req.originalUrl
                    }
                };
                firebaseServ.getAll(homesSaleUrl).then(function (homes) {
                    //console.log(homes);
                    for (var mls in homes) {
                        var home = homes[mls];
                        if (home.agent == broker.id) {
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
                            vm.og.description += '\r\n Active Listings';
                            res.render('broker-listings', {vm: vm});
                            break;
                        case 'blogs':
                            firebaseServ.getAllFilter(constants.url + 'blogs', function (array) {
                                return _.filter(array, function (blog) {
                                    return blog.brokerId === broker.id && (!blog.endorsements);
                                });

                            }).then(function (brokerBlogs) {
                                console.log(brokerBlogs);
                                vm.broker.blogs = brokerBlogs
                                res.render('broker-blogs', {vm: vm});
                            });
                            break;
                        case 'reviews':
                            firebaseServ.getAll(constants.url + 'homes/agents/' + broker.id + '/reviews').then(function (reviews) {
                                vm.broker.reviews = reviews
                                res.render('broker-reviews', {vm: vm});
                            });
                            break;
                        case 'endorsements':
                            firebaseServ.getAllFilter(constants.url + 'blogs', function (array) {
                                return _.filter(array, function (blog) {
                                    return blog.brokerId === broker.id && blog.endorsements;
                                });

                            }).then(function (endors) {
                                vm.broker.endors = endors
                                res.render('broker-endorsements', {vm: vm});
                            });
                            break;

                        default:
                            res.render('broker-profile', {vm: vm});
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
