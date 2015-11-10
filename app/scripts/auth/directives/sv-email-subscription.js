(function () {
    'use strict';
    angular.module('auth')
        .directive('svEmailSubscription', function (userAuth,FbGenServ) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-email-subscription.html',
                scope: {},
                link: function ($scope) {
                    $scope.user = userAuth.profile;


                }
            };
        });
})();
