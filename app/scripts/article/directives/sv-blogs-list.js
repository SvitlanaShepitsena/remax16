(function () {
    'use strict';
    angular.module('article')
        .directive('svBlogsList', function (FbGenServ, $sce, url, userAuth, $stateParams) {
            return {
                replace: true,
                templateUrl: 'scripts/article/directives/sv-blogs-list.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id ? $stateParams.id : userAuth.profile.$id;
                    FbGenServ.getAssync(url + 'blogs', function (blogs) {
                        return _.filter(blogs,
                            function (blog) {
                                return !blog.endorsements && blog.brokerId == brokerId;
                            });

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
