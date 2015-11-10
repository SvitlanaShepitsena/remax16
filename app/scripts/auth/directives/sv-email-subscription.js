(function () {
    'use strict';
    angular.module('auth')
        .directive('svEmailSubscription', function (userAuth, FbGenServ, url) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-email-subscription.html',
                scope: {},
                link: function ($scope) {
                    $scope.user = userAuth.profile;

                    var userSub = FbGenServ.getObject(url + 'subscriptions/' + $scope.user.userName);

                    userSub.$bindTo($scope,'subscription');


                }
            };
        });
})();
