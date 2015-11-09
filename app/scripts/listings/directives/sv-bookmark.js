(function () {
    'use strict';

    angular.module('listings')
        .directive('svBookmark', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-bookmark.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
