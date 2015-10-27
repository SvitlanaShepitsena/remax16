(function () {
    'use strict';
    angular.module('auth')
        .directive('svLoginForm', function (toastr, $state, userAuth, AuthenticationServ) {
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
                    $scope.singIn = function () {
                        AuthenticationServ.svetLogin($scope.user.email, $scope.user.password).then(function (user) {
                            if (userAuth.profile.isManager()) {
                                $state.go('app.manager.dashboard', {uid: userAuth.key});
                            } else {
                                if (userAuth.profile.isStaff()) {
                                    $state.go('app.user.listings', {uid: userAuth.profile.userName});

                                } else{
                                    $state.go('app.user.profile-settings', {uid: userAuth.profile.userName});
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
