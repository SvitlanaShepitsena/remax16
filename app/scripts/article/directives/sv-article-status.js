(function () {
    'use strict';
    angular.module('article')
        .directive('svArticleStatus', function (ArticlesServ, $rootScope) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-article-status.html',
                scope: {
                    article: '=',
                    key: '=',
                    property: '@',
                    chBox: '=',
                    lbl: '@'
                },
                link: function ($scope, el, attrs) {
                    $scope.changeArticleStatus = function (key) {
                        ArticlesServ.computeNewsOrder(key).then(function () {
                            $rootScope.$broadcast('homeNewsChanged');

                        })
                    };
                }
            };
        });
})();
