(function () {
    'use strict';
    angular.module('auth')
        .directive('svSocialProvider', function (AuthenticationServ, $state, userAuth) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-social-provider.html',
                scope: {
                    provider: '@',
                    btnClass: '@',
                    btnName: '@',
                    iconClass: '@',
                    icon: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.icon = $scope.icon || $scope.provider;
                    $scope.loginProvider = function (provider) {
                        provider = provider.toLowerCase().replace('+', '');

                        AuthenticationServ.authWithProvider(provider).then(function () {

                            var user = userAuth.profile;
                            if (user) {
                                if (user.isStaff()) {
                                    $state.go('app.user.listings', {uid: userAuth.profile.userName})
                                    return;

                                }
                                if (user.isManager()) {
                                    $state.go('app.manager.dashboard', {uid: userAuth.profile.userName})
                                    return;

                                }
                                if (user.isCustomer()) {
                                    $state.go('app.user.account-settings', {uid: userAuth.profile.userName})
                                    return;
                                }
                            }
                        }).catch(function (err) {
                            console.log(err);
                        })
                    };
                }
            };
        });
})();
