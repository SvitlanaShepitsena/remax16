(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormPublicFacts', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-public-facts.html',
                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                }
            };
        });
})();
