(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormUtilities', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-utilities.html',
                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                }
            };
        });
})();
