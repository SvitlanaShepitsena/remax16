(function () {
    'use strict';
    angular.module('auth')
        .directive('svEmailSubscription', function (PdfSubscriptionsServ, userAuth) {
            return {
                replace: true,
                templateUrl: 'scripts/auth/directives/sv-email-subscription.html',
                scope: {},
                link: function ($scope) {
                    $scope.user = userAuth.profile;
                    var pdfSubObj = PdfSubscriptionsServ.getObjectRef();
                    if (pdfSubObj) {
                        $scope.requestSubmited = true;
                        pdfSubObj.$bindTo($scope, 'subscription').then(function () {
                            $scope.requestSubmited = false;
                        }).catch(function (error) {
                            $scope.requestSubmited = false;
                        });
                    }
                }
            };
        });
})();
