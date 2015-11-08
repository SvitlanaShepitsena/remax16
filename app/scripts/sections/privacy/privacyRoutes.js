(function () {
    'use strict'

    angular.module('sections.privacy', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

				.state("app.privacy-policy", {
					url: "/privacy-policy", 
					controller:"PrivacyPolicyCtrl",
					templateUrl: "scripts/sections/privacy/views/privacy-policyCtrl.html"
				})
//#state'

    });
})();

