(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormExterior', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-exterior.html',
                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                }
            };
        });
})();
