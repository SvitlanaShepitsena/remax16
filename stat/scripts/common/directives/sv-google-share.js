(function () {
    'use strict';

    angular.module('common')
        .directive('svGoogleShare', function ($location, $timeout) {
            return {
                templateUrl: 'scripts/common/directives/sv-google-share.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $timeout(function () {
                        $scope.pageUrl = $location.absUrl();
                    }, 500)
                }
            };
        });
})();
