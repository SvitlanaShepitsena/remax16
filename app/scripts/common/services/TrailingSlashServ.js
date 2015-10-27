(function () {
    'use strict';
    angular.module('common')
        .factory('TrailingSlashServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
            return {
                add: function addTrailingSlash(path) {
                    if (_.last(path) !== '/') {
                        path += '/';

                    }
                    return path;

                }

            };
        });
})();
