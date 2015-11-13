(function () {
    'use strict';
    angular.module('auth')
        .directive('svLoginForm', function (toastr, url, $state, userAuth, AuthenticationServ, $stateParams, FbGenServ, companyName) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-login-form.html',
                scope: {
                    headerTitle: '@',
                    loginBtn: '@',
                    registerAccount: '@',
                    newUser: '@'
                },
                controller: function ($scope) {
                    $scope.companyName = companyName;

                    $scope.signIn = function (email, password) {
                        AuthenticationServ.appLogin(email, password).then(function (user) {
                            if ($scope.user.subscriptions) {

                                var subsObj = {
                                    email: email,
                                    weekly: true
                                };
                                var subsUrl = url + 'subscriptions/' + user.userName;
                                FbGenServ.saveObject(subsUrl, subsObj).then(function () {

                                })
                            }
                            if (userAuth.profile.isManager()) {
                                $state.go('app.manager.dashboard', {uid: userAuth.key});
                            }
                            else {
                                if (userAuth.profile.isStaff()) {
                                    $state.go('app.user.listings', {uid: userAuth.profile.userName});

                                }
                                else {
                                    $state.go('app.user.account-settings', {uid: userAuth.profile.userName});
                                }
                            }
                        }).catch(function (error) {

                            toastr.error(error.message);
                        })
                    }
                },
                link: function ($scope, el, attrs) {

                    var temp;
                    var email;
                    $scope.user = {
                        email: '',
                        password: ''
                    }
                    var credentials = $stateParams.credentials.split('/');
                    if (credentials.length > 1) {
                        email = credentials[0];
                        temp = credentials[1];

                    }


                    if (email && temp) {

                        $scope.signIn(email, temp)

                    }

                }
            };
        });
})();
