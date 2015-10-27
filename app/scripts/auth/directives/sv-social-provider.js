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
                            if (userAuth.profile && userAuth.profile.isStaff()) {
                                $state.go('app.brokers.broker.profile', {id: userAuth.profile.brokerId})
                            } else {
                                $state.go('app.user.dashboard', {uid: userAuth.profile.userName})
                            }
                        });
                    };
                }
            };
        });
})();
