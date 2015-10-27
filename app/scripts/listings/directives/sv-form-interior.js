(function () {
    'use strict';

    angular.module('listings')
        .directive('svFormInterior', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-form-interior.html',
                link: function ($scope, el, attrs) {
                }
            };
        });
})();
