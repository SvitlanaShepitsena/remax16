				.state("app.user-bookmarks", {
					url: "/user-bookmarks", 
					controller:"UserBookmarksCtrl",
					templateUrl: "scripts/auth/views/user-bookmarksCtrl.html"
				})

(function () {
    'use strict'
    angular.module('auth', ['ui.router', 'flow'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=auth*/

        });
})();