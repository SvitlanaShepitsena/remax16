(function () {
    'use strict';

    angular.module('search')
        .directive('svSearchCell', function ($mdBottomSheet) {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-search-cell.html',
                controller: function ($scope, $timeout) {
                    $scope.alert = '';
                    $scope.showListBottomSheet = function ($event) {
                        $scope.alert = '';
                        $mdBottomSheet.show({
                            templateUrl: 'scripts/search/templates/search-cell-template.html',
                            targetEvent: $event
                        }).then(function (clickedItem) {
                            $scope.alert = clickedItem.name + ' clicked!';
                        });
                    };
                    $scope.listItemClick = function ($index) {
                        var clickedItem = $scope.items[$index];
                        $mdBottomSheet.hide(clickedItem);
                    };
                }
            };
        });
})();
