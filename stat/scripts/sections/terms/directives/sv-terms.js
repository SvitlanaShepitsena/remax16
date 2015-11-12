(function () {
    'use strict';

    angular.module('sections.terms')
        .directive('svTerms', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/terms/directives/sv-terms.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
