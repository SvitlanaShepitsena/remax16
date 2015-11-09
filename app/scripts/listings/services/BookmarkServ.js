(function () {
    'use strict';
    angular.module('listings')
        .factory('BookmarkServ', function ($q, url, $rootScope, toastr, $state, users, $firebaseObject, $firebaseArray,FbGenServ,userAuth) {;
            return {

                add: function (home) {
                    return $q(function (resolve, reject) {

                            if (!userAuth.profile) {
                                toastr.warning('Please login to save home to bookmarks', {timeout: 10000});
                                $state.go('app.login');
                                return;
                            }
                            var savePath = url + 'bookmarks/' + userAuth.profile.userName + '/';
                            var saveObj = {};
                            saveObj[home] = true;

                            FbGenServ.saveObject(savePath, saveObj).then(function (ref) {
                                resolve();
                            });

                        $scope.removeFromBookmarks = function (home) {
                            if (!userAuth) {
                                toastr.warning('Please login to save home to bookmarks');
                                return;
                            }
                            var pathRemove = url + 'bookmarks/' + userAuth.profile.userName + '/' + home;
                            FbGenServ.removeObj(pathRemove).then(function (ref) {
                                if ($state.current.name.indexOf('bookmarks') > -1) {

                                    $rootScope.$broadcast('bookmark:deleted', home);
                                }
                                resolve
                            });
                        };
                    });
                },
                remove: function () {
                    return $q(function (resolve, reject) {
                    });
                }
            };
        });
})();
