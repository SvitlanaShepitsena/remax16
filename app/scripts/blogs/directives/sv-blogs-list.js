(function () {
    'use strict';
    angular.module('blogs')
        .directive('svBlogsList', function (FbGenServ, $sce, url, userAuth, $stateParams) {
            return {
                replace: true,
                templateUrl: 'scripts/blogs/directives/sv-blogs-list.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id ? $stateParams.id : userAuth.profile.$id;
                    FbGenServ.getAssync(url + 'blogs', function (blogs) {
                        return _.where(blogs, {brokerId: brokerId});
                    }).then(function (brokerBlogs) {
                        $scope.loaded = true;
                        $scope.blogs = brokerBlogs;
                    })

                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            };
        });
})();
