(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormTaxes', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-taxes.html',
                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                }
            };
        });
})();
