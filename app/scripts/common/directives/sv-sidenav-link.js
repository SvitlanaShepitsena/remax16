(function () {
    'use strict';
    angular.module('common')
        .directive('svNavLink', function ($mdSidenav) {
            return {
                templateUrl: '/scripts/common/directives/sv-sidenav-link.html',
                scope: {
                    url: '@',
                    stitle: '@',
                    side: '@',
                    icon: '@',
                    someObject: '=',
                    someString: '@',
                    someExpr: '&'
                },
                link: function ($scope, el, attrs) {
                    $scope.closeSideBar = function () {
                        $mdSidenav('left').close();
                        $mdSidenav('right').close();
                    };
                }
            };
        });
})();
