(function () {
    'use strict';

    angular.module('auth')
        .controller('UserBookmarksCtrl', function ($scope, FbGenServ, url, userAuth) {
            FbGenServ.getAssync(url + 'bookmarks/' + userAuth.profile.userName).then(function (res) {
                var bookmarks = _.pluck(res, '$id');

                $scope.bookmarks = bookmarks;

            });


        });
})();

