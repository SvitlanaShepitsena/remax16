var path = require('path');
var _ = require('lodash');
var firebaseServ = require('../services/FirebaseServ');
var sectionArticlesFilter = require('../filters/SectionArticlesFilter');
var userAgentServ = require('../services/UserAgentServ');

var defaultThumb = require('../services/const').defaultThumb;

module.exports = function sectionsRouter(express) {

    var sectionsRouter = express.Router();

    sectionsRouter.get('/:sectionName', function (req, res, next) {
        var isBlog = false;

        var sectionName = req.params.sectionName;

        var userAgent = req.get('user-agent');

        if (userAgentServ.amIBot(userAgent)) {
            /*create a view-model for fb crawler*/
            var rootUrl = (req.protocol || 'http') + '://' + req.get('host');

            var vm = {
                rootUrl: rootUrl,
                title: _.capitalize(sectionName + ' News')
            };

            var postsUrl = 'https://svet.firebaseio.com/articles';
            firebaseServ.getAll(postsUrl).then(function (data) {
                var articles = sectionArticlesFilter.getSectionNews(data, sectionName, isBlog);
                vm.articles = _.map(articles, function (article) {

                    article.img = article.img ? article.img : defaultThumb;
                    return article;

                })
                res.render('sections', {vm: vm});

            }, function (Error) {

            });
        } else {
            next();
        }
    });

    /*Redirect user to AngularJs App*/
    var appFolder =require('./dirServ')();
    sectionsRouter.use(express.static(appFolder));

    sectionsRouter.get('/', function (req, res) {
        res.sendFile('index.html', {root: appFolder});
    });
    return sectionsRouter;

};
