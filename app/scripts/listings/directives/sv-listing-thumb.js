(function () {
    'use strict';

    angular.module('listings')
        .directive('svListingThumb', function ($rootScope, $state, avatarBroker, maps, googleMap, userAuth, toastr, FbGenServ, url, BookmarkServ) {
            function concatenate(address) {
                var final = '';
                for (var p in address) {
                    final += address[p] + ' ';
                }
                return final.trim();
            }

            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-listing-thumb.html',
                scope: {
                    home: '=',
                    bookmarks: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.avatarBroker = avatarBroker;
                    $scope.maps = maps;
                    $scope.googleMap = googleMap;
                    $scope.fullAddress = maps + concatenate($scope.home.address);




                }
            };
        });
})();
