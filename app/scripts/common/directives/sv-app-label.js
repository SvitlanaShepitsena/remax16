(function () {
    'use strict';
    angular.module('common')
        .directive('svSvetLabel', function ($state) {
            return {
                templateUrl: 'scripts/common/directives/sv-app-label.html',
                scope: {
                    routeName: '@',
                    iconType: '@',
                    iconName: '@',
                    params: '=',
                    fs: '@',
                    tc: '@',
                    bgc: '@',
                    cursorType: '@',
                    sectionTitle: '@',
                    textDecoration: '@',
                    labelPadding: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.textDecoration = $scope.textDecoration || 'underline';
                    $scope.fs = 'fs-caption' || $scope.fs;
                    $scope.tc = $scope.tc || 'tc-grey-500';
                    $scope.bgc = $scope.bgc || 'bgc-grey-300';
                    $scope.labelPadding = $scope.labelPadding ||
                        '2px 4px';
                    $scope.navigateTo = function () {
                        $state.go($scope.routeName, $scope.params);
                    };
                }
            };
        });
})();
