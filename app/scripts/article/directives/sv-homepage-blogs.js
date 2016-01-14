(function () {
    'use strict';

    angular.module('article')
        .directive('svHomepageBlogs', function (BlogsServ, $sce) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-homepage-blogs.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    BlogsServ.getRandomBlogs().then(function (blogs) {
                        $scope.blogs = _.filter(blogs, function (blog) {
                          return blog.isPublic;
                        });

                    });

                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            };
        });
})();
