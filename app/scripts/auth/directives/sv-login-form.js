(function () {
    'use strict';
    angular.module('auth')
        .directive('svLoginForm', function (toastr, $state, userAuth, AuthenticationServ, $stateParams) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-login-form.html',
                scope: {
                    headerTitle: '@',
                    loginBtn: '@',
                    registerAccount: '@',
                    newUser: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.user = {
                        email: '',
                        password: ''
                    }
                    var email = $stateParams.email;
                    var temp = $stateParams.temp;

                    if (email.length && temp.length) {

                        $scope.singIn(email, password)

                    }

                    $scope.singIn = function (email, password) {
                        AuthenticationServ.svetLogin(email, password).then(function (user) {
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
                }
            };
        });
})();
