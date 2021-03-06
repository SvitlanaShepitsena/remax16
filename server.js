var express = require('express');
var path = require('path');
var http = require('http');
var _ = require('lodash');
var app = express();

//app.enable('strict routing');
//app.use(helmet.frameguard('allow-from', companyWebsite));
// Jade to Html formatting on browser
app.locals.pretty = false;
/*configure server security not to reveal which server you are running*/
app.disable('x-powered-by');
app.disable('strict routing');
// Managing template engine for Express (Jade)
app.set('view engine', 'jade'); // register the template engine
app.set('views', path.join(__dirname, 'views')); // specify the views directory
//app.use(function (req, res, next) {
//    if (req.url.indexOf('.') > -1) {
//        next();
//    }
//    else {
//        if (req.url.substr(-1) !== '/') {
//            res.redirect(301, req.url + '/');
//        } else {
//            next();
//        }
//    }
//})
var wwwRedirect = require('./routes/wwwRedirect')(express);
/*local*/
var uploadRouter = require('./routes/upload')(express);
var emailConfirmationRouter = require('./routes/emailConfirmation')(express);
var homeRouter = require('./routes/home')(express);
var brokerRouter = require('./routes/broker')(express);
var brokersRouter = require('./routes/brokers')(express);
var termsRouter = require('./routes/terms')(express);
var privacyRouter = require('./routes/privacy')(express);
var contactUsRouter = require('./routes/contact')(express);
var searchRouter = require('./routes/search')(express);
var oneBlogRouter = require('./routes/oneBlog')(express);
var oneListingSaleRouter = require('./routes/oneListingSale')(express);
var oneListingRentRouter = require('./routes/oneListingRent')(express);
var aboutRouter = require('./routes/about')(express);
var loginRouter = require('./routes/login')(express);
var signUpRouter = require('./routes/signUp')(express);

// --- Routes ---
app.use(/.*/, wwwRedirect);
app.use('/email-confirmation-1stclass', emailConfirmationRouter);
app.use('/broker-thumb', uploadRouter);
app.use('/contact', contactUsRouter);
app.use('/terms-of-use', termsRouter);
app.use('/privacy-policy', privacyRouter);
app.use('/search', searchRouter);
app.use('/blogs', oneBlogRouter);
app.use('/homes-for-sale', oneListingSaleRouter);
app.use('/homes-for-rent', oneListingRentRouter);
app.use('/login', loginRouter);
app.use('/sign-up', signUpRouter);
app.use('/about-remax-1st-class', aboutRouter);
app.use('/brokers', brokerRouter);
app.use('/brokers', brokersRouter);
app.use('/', homeRouter);
//// Transfer any unrecognized route to Angular
//var appFolder = path.join(__dirname, 'build');
var appFolder = require('./routes/dirServ')();

app.use(express.static(appFolder));

app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: appFolder});
});
process.env.NODE_ENV = 'dev';

/*Create http server*/
var port = 80;
var port = process.platform === 'win32' ? 5000 : 80;
app.listen(port, function () {
    console.log('listen on port ' + port);
});
module.exports = app;
