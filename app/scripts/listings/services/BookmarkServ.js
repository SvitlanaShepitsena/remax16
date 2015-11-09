(function () {
    'use strict';
    angular.module('listings')
        .factory('BookmarkServ', function ($q, url, $rootScope, toastr, $state, users, $firebaseObject, $firebaseArray, FbGenServ, userAuth) {
            ;
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

                    });
                },
                remove: function (home, isBookmarkState) {
                    return $q(function (resolve, reject) {

                        if (!userAuth.profile) {
                            toastr.warning('Please login to save home to bookmarks', {timeout: 10000});
                            $state.go('app.login');
                            return;
                        }
                        var savePath = url + 'bookmarks/' + userAuth.profile.userName + '/';
                        var saveObj = {};
                        saveObj[home] = true;

                        FbGenServ.removeObj(savePath, saveObj).then(function (ref) {
                            if (isBookmarkState) {
                                $rootScope.$broadcast('bookmark:deleted', home);
                            }
                            resolve();
                        });

                    });
                },
                getAuthUserBookmarks: function () {

                    return $q(function (resolve, reject) {
                        if (!userAuth.profile) {
                            reject();
                        } else {

                            var fbUrl = url + 'bookmarks/' + userAuth.profile.userName;
                            var fbArr = $firebaseArray(new Firebase(fbUrl));
                            fbArr.$loaded().then(function () {
                                resolve(fbArr);
                            })
                        }
                    })
                }
            };
        });
})();
