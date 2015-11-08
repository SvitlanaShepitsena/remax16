(function () {
    'use strict'

    angular.module('sections', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

				.state("app.terms-of-use", {
					url: "/terms-of-use", 
					controller:"TermsOfUseCtrl",
					templateUrl: "scripts/sections/views/terms-of-useCtrl.html"
				})
//#state'

    });
})();

