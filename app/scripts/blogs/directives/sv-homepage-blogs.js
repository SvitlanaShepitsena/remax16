(function () {
    'use strict';

    angular.module('blogs')
        .directive('svHomepageBlogs', function (BlogsServ, $sce) {
            return {
                replace: true,
                templateUrl: 'scripts/blogs/directives/sv-homepage-blogs.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    BlogsServ.getRandomBlogs().then(function (blogs) {
                        $scope.blogs = blogs;

                    });

                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            };
        });
})();
