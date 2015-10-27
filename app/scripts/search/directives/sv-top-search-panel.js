(function () {
    'use strict';

    angular.module('search')
        .directive('svTopSearchPanel', function (localStorageService, $rootScope) {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-top-search-panel.html',
                link: function ($scope, el, attrs) {

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
