var path = require('path');
var _ = require('lodash');
var moment = require('moment');
var url = require('../services/const').url;
var defaultThumb = require('../services/const').defaultThumb;
var firebaseServ = require('../services/FirebaseServ');
var userAgentServ = require('../services/UserAgentServ');
module.exports = function articlesRouter(express) {
	var articlesRouter = express.Router();
	articlesRouter.get('/:id', function (req, res, next) {
		var articleId = req.params.id;
		var userAgent = req.get('user-agent');
		var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
		var fullUrl = rootUrl + req.originalUrl;
		if (userAgentServ.amIBot(userAgent)) {
			var articleUrl = url + '/articles/' + articleId;
			firebaseServ.getItem(articleUrl).then(function (article) {
				article.img = article.img ? article.img : defaultThumb;
				article.timestamp = moment(article.timestamp, 'x').format("LLL");
				var vm = {
					image: rootUrl + '/img/logo/svet-logo-fb.jpg' || article.img,
					og: {
						title: article.title,
						url: fullUrl,
						description: article.summary,
						image: rootUrl + '/img/logo/svet-logo-fb.jpg' || article.img
					}
				};
				vm.article = article;
				vm.og = {
					title: article.title,
					url: fullUrl,
					description: article.summary,
					image: article.img
				}
				res.render('articles', {vm: vm});
			}, function (Error) {
				console.log(Error.message);
			});
		} else {
			next();
		}
	});
	var appFolder =require('./dirServ')();
	console.log(appFolder);
	articlesRouter.use(express.static(appFolder));
	articlesRouter.get('/:id/', function (req, res) {
	    res.sendFile('index.html', {root: appFolder});
	});
	return articlesRouter;
};
