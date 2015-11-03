(function () {
    'use strict';

    angular.module('listings')
        .directive('svListingThumb', function (avatarBroker, maps, googleMap, userAuth, toastr, FbGenServ, url) {
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
                    home: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.avatarBroker = avatarBroker;
                    $scope.maps = maps;
                    $scope.googleMap = googleMap;
                    $scope.fullAddress = maps + concatenate($scope.home.address);


                    $scope.addToBookmarks = function (home) {
                        if (!userAuth) {
                            toastr.warning('Please login to save home to bookmarks');
                            return;
                        }
                        var savePath = url + 'bookmarks/' + userAuth.profile.userName + '/';
                        var saveObj = {};
                        saveObj[home] = true;

                        FbGenServ.saveObject(savePath, saveObj).then(function (ref) {
                            console.log(ref);
                        });


                    };

                }
            };
        });
})();
