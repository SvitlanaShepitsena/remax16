(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormInfo', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-info.html',
                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                    $scope.listing.status = 'active';

                }
            };
        });
})();
