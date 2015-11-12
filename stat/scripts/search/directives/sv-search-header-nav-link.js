(function () {
    'use strict';

    angular.module('search')
        .directive('svSearchHeaderNavLink', function () {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-search-header-nav-link.html',
                scope: {},
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
