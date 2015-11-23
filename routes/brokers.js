var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function brokers(express) {

    var brokersRouter = express.Router();

    brokersRouter.get('/', function (req, res, next) {
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

        if (userAgentServ.amIBot(userAgent)) {

            var vm = {
                url: rootUrl,
                title: constants.homePageTitle,
                description: constants.homePageDescription,
                image: constants.companyLogoFb,
                og: {
                    title: constants.homePageTitle,
                    description: constants.homePageDescription,
                    image: constants.companyLogoFb,
                    url: rootUrl,
                }
            };

            var brokersUrl = constants.url + 'homes/agents';
            var homesSaleUrl = constants.url + 'homes/sale';
            firebaseServ.getAll(brokersUrl).then(function (brokers) {
                var countSale;
                var brokersArray = [];
                firebaseServ.getAll(homesSaleUrl).then(function (homes) {
                    countSale = _.countBy(homes, function (home) {
                        return home.agent;
                    });

                    for (var n in brokers) {
                        var broker = brokers[n];
                        var activeSale = countSale[n];
                        if (activeSale) {
                            broker.countSale = activeSale;
                        }
                        broker.id = n;
                        brokersArray.push(broker)
                    }
                    vm.brokers = brokersArray;
                    res.render('brokers', {vm: vm});
                }, function (Error) {
                    console.log(Error);
                });

            }, function (Error) {
                console.log(Error);

            });
        } else {
            //next();
        }
    });
    return brokersRouter;
};
