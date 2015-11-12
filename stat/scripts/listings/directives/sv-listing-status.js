(function () {
    'use strict';

    angular.module('listings')
        .directive('svListingStatus', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-listing-status.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
