(function () {
    'use strict';
    angular.module('brokers')
        .directive('svBrokerBlogs', function (url, $stateParams, FbGenServ, userAuth) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-blogs.html',
                scope: {
                    blogs: '='
                },
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id ? $stateParams.id : userAuth.profile.brokerId;
                    FbGenServ.getAssync(url + 'blogs', function (blogs) {
                        return _.where(blogs, {brokerId: brokerId});
                    }).then(function (brokerBlogs) {
                        $scope.loaded = true;
                    })
                }
            };
        });
})();
