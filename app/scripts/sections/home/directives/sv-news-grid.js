(function () {
    'use strict';
    angular.module('sections.home')
        .directive('svNewsGrid', function ($rootScope) {
            return {
                replace: true,
                scope: {
                    news: '=',
                    exclude: '=',
                    filterSection:'@',
                    withoutSection:'@'

                },
                templateUrl: 'scripts/sections/home/directives/sv-news-grid.html',
                link: function ($scope, el, attrs) {

                    $scope.$watch('news', function (newValue, oldValue) {
                        if (!newValue) {
                            return;
                        }
                        $scope.gridNews = _.slice(newValue, 3);

                    });


                }
            };
        });
})();
