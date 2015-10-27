(function () {
    'use strict';

    angular.module('common')
        .directive('svFbLike', function (TrailingSlashServ, $location) {
            return {
                templateUrl: 'scripts/common/directives/sv-fb-like.html',
                scope: {
                    btnAction: '@'
                },
                link: function ($scope, el, attrs) {

                    $scope.pageUrl = TrailingSlashServ.add($location.absUrl());
	                console.log($scope.pageUrl);
                    $scope.profiles = $scope.profiles || "false";
                    $scope.btnAction = $scope.btnAction || "like";


                }
            };
        });
})();
