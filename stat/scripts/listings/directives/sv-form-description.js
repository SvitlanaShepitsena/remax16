(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormDescription', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-description.html',

                link: function ($scope, el, attrs) {
                    $scope.listing = $scope.listing || {};
                }
            };
        });
})();
