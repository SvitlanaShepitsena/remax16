(function () {
    'use strict';

    angular.module('search')
        .directive('svCityTabs', function ($mdDialog, $state) {
            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-city-tabs.html',
                scope: {
                    home: '='
                },
                link: function ($scope, el, attrs) {
                    var currentState = $state.current.name;

                    if (currentState && _.contains(currentState, 'about2')) {
                        $scope.selectedIndex = 1;
                    }

                }
            };
        });
})();
