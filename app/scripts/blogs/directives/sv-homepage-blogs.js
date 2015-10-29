(function () {
    'use strict';

    angular.module('blogs')
        .directive('svHomepageBlogs', function () {
            return {
                replace: true,
                templateUrl: 'scripts/blogs/directives/sv-homepage-blogs.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
