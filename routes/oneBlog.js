var path = require('path');
var constants = require('../services/const');
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');
var defaultThumb = require('../services/const').defaultThumb;

module.exports = function oneBlog(express) {
    var oneBlogRouter = express.Router();

    oneBlogRouter.get('/:id', function (req, res, next) {
        var id = req.params.id;
        var userAgent = req.get('user-agent');
        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
        var fullUrl = rootUrl + req.originalUrl;
        var blogUrl = constants.url + 'blogs/' + id;

        if (userAgentServ.amIBot(userAgent)) {
            firebaseServ.getItem(blogUrl).then(function (blog) {
                blog.imgThumb = blog.img || defaultThumb;
                blog.fullTitle = blog.title;
                blog.fullDescription = blog.summary;
                /*create a view-model for fb crawler*/
                var vm = {
                    url: fullUrl,
                    title: blog.fullTitle,
                    image: blog.imgThumb,
                    og: {
                        url: fullUrl,
                        title: blog.fullTitle,
                        description: blog.fullDescription,
                        image: blog.imgThumb
                    }
                };
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
