(function () {
    'use strict';
    angular.module('sections.header')
        .directive('svSocialTopNavCell', function ($mdBottomSheet, $mdSidenav) {
            return {
                replace: true,
                templateUrl: 'scripts/sections/header/directives/sv-social-top-nav-cell.html',
                scope: {},
                controller: function ($scope, $timeout) {
                    $scope.alert = '';
                    $scope.showListBottomSheet = function ($event) {
                        $scope.alert = '';
                        $mdBottomSheet.show({
                            templateUrl: 'scripts/common/templates/social-top-nav-cell.html',
                            targetEvent: $event
                        }).then(function (clickedItem) {
                            $scope.alert = clickedItem.name + ' clicked!';
                        });
                    };
                    $scope.listItemClick = function ($index) {
                        var clickedItem = $scope.items[$index];
                        $mdBottomSheet.hide(clickedItem);
                    };
                    $scope.closeSideBar = function ($index) {
                        var clickedItem = $scope.items[$index];
                        $mdSidenav('left').hide(clickedItem);
                        $mdSidenav('right').hide(clickedItem);
                    };
                }
            };
        });
})();
