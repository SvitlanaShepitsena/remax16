(function () {
    'use strict';
    angular.module('listings')
        .directive('svProfileListingThumb', function ($state) {
            function concatenate(address) {
                var final = '';
                for (var p in address) {
                    final += address[p] + ' ';
                }
                return final.trim();
            }

            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-profile-listing-thumb.html',
                scope: {
                    home: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.$state = $state;
                    //$scope.fullAddress = maps + concatenate($scope.home.address);
                }
            };
        });
})();
