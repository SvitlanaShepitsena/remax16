var firebaseServ = require('../services/FirebaseServ');
var constants = require('../services/const');
var _ = require('lodash');

module.exports = function emailConfirmation(express) {

    var emailConfirmationRoute = express.Router();

    emailConfirmationRoute.get('/:email/:temp', function (req, res, next) {
        var email = req.params['email'];
        var temp = req.params['temp'];

        var registeredUsers = constants.url + 'user-management/users/';
        firebaseServ.getAll(registeredUsers).then(function (data) {
            var keys = _.keys(data);
            console.log(keys);
            _.toArray(data).forEach(function (user, id) {
                var key = keys[id];
                if (user.profile.email == email) {
                    var objectToUpdateUrl = registeredUsers + key + '/' + 'profile/unconfirmed';
                    console.log(objectToUpdateUrl);
                    firebaseServ.removeItem(objectToUpdateUrl).then(function () {
                        var rootUrl = (req.protocol || 'http') + '://' + req.get('host');
                        var redirectPath = rootUrl + '/login/' + email + '/' + temp + '/';
                        console.log(redirectPath);
                        res.redirect(redirectPath);
                        //req.session.email = email;
                        //req.session.temp = temp;
                        //res.redirect('/login');
                    })

                }

            });

        }, function (Error) {

        });


    });

    ///*Redirect user to AngularJs App*/
    //var appFolder =require('./dirServ')();
    //aboutUsRouter.use(express.static(appFolder));
    //
    //aboutUsRouter.get('/:aboutContent?', function (req, res) {
    //    res.sendFile('index.html', {root: appFolder});
    //});
    return emailConfirmationRoute;

};
