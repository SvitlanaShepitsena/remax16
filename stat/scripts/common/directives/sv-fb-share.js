(function () {
    'use strict';

    angular.module('common')
        .directive('svFbShare', function (TrailingSlashServ,$location) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-fb-share.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.pageUrl = TrailingSlashServ.add($location.absUrl());
                }
            };
        });
})();
