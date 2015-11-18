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
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var fullUrl = rootUrl + req.originalUrl;

        if (userAgentServ.amIBot(userAgent)) {
            /*requests to Firebase*/
            var brokerUrl = constants.url + 'homes/agents/' + brokerId;
            var homesSaleUrl = constants.url + 'homes/sale';
            firebaseServ.getAll(brokerUrl).then(function (broker) {
                broker.id = brokerId;
                broker.fullTitle = broker.fName + ' ' + broker.lName + '- Real Estate Agent in Skokie IL - Re/Max 1st Class';
                broker.fullDescription = 'Let us guide you. See how much better than a dream home the right home can be.​';
                var brokerHomes = [];
                var vm = {
                    title: broker.fullTitle,
                    description: broker.fullDescription,
                    image: broker.pic || constants.defaultThumb,
                    url: fullUrl,
                    og: {
                        title: broker.fullTitle,
                        description: broker.fullDescription,
                        image: broker.pic || constants.defaultThumb,
                        url: fullUrl
                    }
                };
                firebaseServ.getAll(homesSaleUrl).then(function (homes) {
                    for (var mls in homes) {
                        var home = homes[mls];
                        if (home.agent == broker.id) {
                            brokerHomes.push(home)
                        }
                    }
                    broker.listings = brokerHomes;
                    vm.broker = broker;
                    switch (param) {
                        case 'profile':
                            res.render('broker-profile', {vm: vm});
                            break;
                        case 'listings':
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
    var appFolder = require('./dirServ')();
    brokerRouter.use(express.static(appFolder));

    brokerRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return brokerRouter;

};
