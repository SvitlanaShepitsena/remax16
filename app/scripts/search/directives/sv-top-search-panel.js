(function () {
    'use strict';

    angular.module('search')
        .directive('svTopSearchPanel', function ($state, localStorageService, $rootScope) {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-top-search-panel.html',
                link: function ($scope, el, attrs) {

                    $scope.isBookMarkState = $state.current.name.indexOf('bookmarks') > -1;

                    $scope.changeMapGridView = function (isMap) {
                        if (isMap) {
                            localStorageService.set('mapView', 'map');
                        } else {
                            localStorageService.set('mapView', 'grid');
                        }
                        $rootScope.$broadcast('mapGrid:changed', isMap);

                    };

                }
            };
        });
})();
