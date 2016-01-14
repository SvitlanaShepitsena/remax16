(function () {
    'use strict';
    angular.module('article')
        .directive('svDeleteArticleBtn', function (toastr, FbGenServ, url) {
            return {
                replace: true,
                require: '?^svBrokerBlogs',
                templateUrl: 'scripts/article/directives/sv-delete-article-btn.html',
                scope: {
                    articleKey: '@',
                    i:'@'
                },
                link: function ($scope, el, attrs, ctrl) {
                    $scope.removeArticle = function () {
                        ctrl.removeBlog($scope.articleKey, $scope.i);
                    };
                }
            };
        });
})();
