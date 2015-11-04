(function () {
    'use strict';

    angular.module('listings')
        .directive('svListingThumb', function ($rootScope,avatarBroker, maps, googleMap, userAuth, toastr, FbGenServ, url) {
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

                    $scope.bookmarked = $scope.bookmarks ? $scope.bookmarks.indexOf($scope.home.$id)>-1 : false;


                    $scope.addToBookmarks = function (home) {
                        if (!userAuth) {
                            toastr.warning('Please login to save home to bookmarks');
                            return;
                        }
                        var savePath = url + 'bookmarks/' + userAuth.profile.userName + '/';
                        var saveObj = {};
                        saveObj[home] = true;

                        FbGenServ.saveObject(savePath, saveObj).then(function (ref) {
                            $scope.bookmarked = true;
                        });


                    };

                    $scope.removeFromBookmarks = function (home) {
                        if (!userAuth) {
                            toastr.warning('Please login to save home to bookmarks');
                            return;
                        }
                        var pathRemove = url + 'bookmarks/' + userAuth.profile.userName + '/'+home;

                        FbGenServ.removeObj(pathRemove).then(function (ref) {
                            $scope.bookmarked = false;
                            $rootScope.$broadcast('bookmark:deleted', home);

                        });


                    };
                }
            };
        });
})();
