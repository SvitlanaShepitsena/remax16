(function () {
    'use strict';

    angular.module('listings')
        .directive('svBookmark', function (BookmarkServ, $state) {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-bookmark.html',
                scope: {
                    home: '=',
                    bookmarks: '='
                },
                link: function ($scope, el, attrs) {
                    if (!$scope.bookmarks) {
                        BookmarkServ.getAuthUserBookmarks().then(function (bookmarks) {
                            $scope.bookmarks = _.pluck(bookmarks, '$id');
                            $scope.bookmarked = $scope.bookmarks ? $scope.bookmarks.indexOf($scope.home.$id) > -1 : false;
                        })
                    } else {
                        $scope.bookmarked = $scope.bookmarks ? $scope.bookmarks.indexOf($scope.home.$id) > -1 : false;
                    }
                    $scope.addToBookmarks = function (home) {
                        BookmarkServ.add(home).then(function () {

                            $scope.bookmarked = true;
                        });
                    };
                    $scope.removeFromBookmarks = function (home) {
                        var isBookmarkState = $state.current.name.indexOf('bookmarks') > -1;

                        BookmarkServ.remove(home, isBookmarkState).then(function () {

                            $scope.bookmarked = false;

                        });

                    };

                }
            };
        });
})();
