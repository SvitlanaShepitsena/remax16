var path = require('path');
var constants = require('../services/const');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function contactUs(express) {

    var contactUsRouter = express.Router();

    contactUsRouter.get('/', function (req, res, next) {

        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {

            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

            /*create a view-model for fb crawler*/
            var vm = {
                rootUrl: rootUrl,
                title: constants.contactPageTitle,
                og: {
                    title: constants.contactPageTitle,
                    description: constants.contactPageDescription,
                }
            };

            res.render('contact', {vm: vm});
        } else {
            next();

        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = path.join(__dirname, require('./dirServ')());
    contactUsRouter.use(express.static(appFolder));

    contactUsRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return contactUsRouter;

};
