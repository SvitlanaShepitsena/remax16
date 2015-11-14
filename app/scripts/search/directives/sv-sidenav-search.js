(function () {
    'use strict';

    angular.module('search')
        .directive('svSidenavSearch', function () {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-sidenav-search.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
