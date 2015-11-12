(function () {
    'use strict';
    angular.module('common')
        .directive('svReadMore', function ($state) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-read-more.html',
                scope: {
                    news: '=',
                    routeName: '@',
                    svParams: '=',
                    readMore: '@',
                },
                link: function ($scope, el, attrs) {
                    $scope.navigate = function () {
                        $state.go($scope.routeName, {id: $scope.svParams});

                    };

                }
            };
        });
})();
