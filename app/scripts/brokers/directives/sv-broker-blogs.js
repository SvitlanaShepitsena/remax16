(function () {
    'use strict';
    angular.module('brokers')
        .directive('svBrokerBlogs', function (url, toastr, $stateParams, FbGenServ, userAuth) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-blogs.html',
                scope: {
                    blogs: '='
                },
                controller: function ($scope) {
                    this.removeBlog = function (key, i) {

                        var fb = url + 'blogs/' + key;
                        FbGenServ.removeObj(fb).then(function () {
                            toastr.success('Blog  deleted');
                            $scope.blogs.splice(i - 1, 1);
                        });

                    };

                },
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id ? $stateParams.id : userAuth.profile.brokerId;
                    FbGenServ.getAssync(url + 'blogs', function (blogs) {
                        $scope.blogs = _.where(blogs, {brokerId: brokerId});

                    }).then(function (brokerBlogs) {
                        $scope.loaded = true;
                    });


                }
            };
        });
})();
