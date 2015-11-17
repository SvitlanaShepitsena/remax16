var path = require('path');
var constants = require('../services/const');

var firebaseServ = require('../services/FirebaseServ');

var userAgentServ = require('../services/UserAgentServ');
module.exports = function oneListingSale(express) {

    var oneBlogRouter = express.Router();

    oneBlogRouter.get('/:id', function (req, res, next) {
        var id = req.params.id;

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


            var blogUrl = constants.url + 'blogs/'+id;
            firebaseServ.getItem(blogUrl).then(function (blog) {
                vm.blog = blog;
                res.render('one-blog', {vm: vm});

            }, function (Error) {
                console.log(Error);

            });


        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder = require('./dirServ')();
    oneBlogRouter.use(express.static(appFolder));

    oneBlogRouter.get('/info', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return oneBlogRouter;

};
