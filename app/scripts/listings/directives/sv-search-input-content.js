(function () {
    'use strict';

    angular.module('listings')
        .directive('svSearchInputContent', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-search-input-content.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
