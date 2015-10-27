(function () {
    'use strict';
    angular.module('common')
        .directive('svBottomSheetHandler', function ($mdBottomSheet) {
            return {
                link: function ($scope, el, attrs) {
                    el.on('touchstart', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $scope.$apply(function () {
                            $mdBottomSheet.show({
                                templateUrl: 'scripts/search/templates/search-cell-template.html'
                            });
                        });
                    });
                    el.on('click', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $scope.$apply(function () {
                            $mdBottomSheet.show({
                                templateUrl: 'scripts/search/templates/search-cell-template.html'

                            });
                        });
                    });
                }
            };
        });
})();
