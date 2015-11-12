(function () {
    'use strict';
    angular.module('sections.about')
        .directive('svAboutCompany', function () {
            return {
                replace: true,
                templateUrl: 'scripts/sections/about/directives/sv-about-company.html',
                scope: {},
                link: function ($scope, el, attrs) {
                }
            };
        });
})();
