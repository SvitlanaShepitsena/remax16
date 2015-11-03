				.state("app.user-reviews", {
					url: "/user-reviews", 
					controller:"UserReviewsCtrl",
					templateUrl: "scripts/auth/views/user-reviewsCtrl.html"
				})


(function () {
    'use strict'
    angular.module('auth', ['ui.router', 'flow'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=auth*/

        });
})();