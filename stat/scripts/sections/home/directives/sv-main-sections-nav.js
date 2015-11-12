(function () {
    'use strict';
    angular.module('sections.home')
        .directive('svMainSectionsNav', function ($mdSidenav) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/home/directives/sv-main-sections-nav.html',
                link: function ($scope, el, attrs) {
                    $scope.closeSideBar = function () {
                        $mdSidenav('left').close();
                        $mdSidenav('right').close();
                    };
                }
            };
        });
})();
