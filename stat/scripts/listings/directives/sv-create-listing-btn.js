(function () {
    'use strict';

    angular.module('listings')
        .directive('svCreateListingBtn', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-create-listing-btn.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
