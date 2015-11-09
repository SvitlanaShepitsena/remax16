

module.exports = function emailConfirmation(express) {

    var emailConfirmationRoute = express.Router();

    emailConfirmationRoute.post('/:email', function (req, res, next) {

        var uid = req.params.get('email');
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
