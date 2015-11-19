var path = require('path');
var _ = require('lodash');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function brokers(express) {

    var brokersRouter = express.Router();

    brokersRouter.get('/', function (req, res, next) {

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
            /*create a view-model for fb crawler*/


        } else {
            //next();

        }
    });

    return brokersRouter;

};
