

module.exports = function emailConfirmation(express) {

    var emailConfirmationRoute = express.Router();

    emailConfirmationRoute.post('/:uid', function (req, res, next) {

        var uid = req.params.get('uid');
        console.log(uid);


    });

    ///*Redirect user to AngularJs App*/
    //var appFolder = path.join(__dirname, require('./dirServ')());
    //aboutUsRouter.use(express.static(appFolder));
    //
    //aboutUsRouter.get('/:aboutContent?', function (req, res) {
    //    res.sendFile('index.html', {root: appFolder});
    //});
    return emailConfirmationRoute;

};
