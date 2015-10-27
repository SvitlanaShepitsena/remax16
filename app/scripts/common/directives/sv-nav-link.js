(function () {
    'use strict';
    angular.module('common')
        .directive('svNavLink', function ($mdSidenav) {
            return {
                templateUrl: '/scripts/common/directives/sv-nav-link.html',
                scope: {
                    url: '@',
                    iconType: '@',
                    navClass: '@',
                    icon: '@',
                    stitle: '@',
                    someObject: '=',
                    someString: '@',
                    someExpr: '&'
                },
                link: function ($scope, el, attrs) {
                }
            };
        });
})();
