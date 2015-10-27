(function () {
    'use strict';
    angular.module('sections.home')
        .directive('svSecondNews', function () {
            return {
                templateUrl: 'scripts/sections/home/directives/sv-second-news.html',
                scope: {
                    lowerLimit: '=',
                    higherLimit: '=',
                    news: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.$watch('news', function (newValue, oldValue) {
                        if (!newValue) {
                            return;
                        }
                        $scope.secondaryNews = _.rest(_.take(newValue, 3));

                    });

                }
            };
        });
})();
