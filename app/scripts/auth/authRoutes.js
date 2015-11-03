				.state("app.user-subscriptions", {
					url: "/user-subscriptions", 
					controller:"UserSubscriptionsCtrl",
					templateUrl: "scripts/auth/views/user-subscriptionsCtrl.html"
				})


(function () {
    'use strict'
    angular.module('auth', ['ui.router', 'flow'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                /*=auth*/

        });
})();