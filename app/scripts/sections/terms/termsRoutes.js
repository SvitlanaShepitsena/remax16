(function () {
    'use strict'

    angular.module('sections.terms', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

				.state("app.terms", {
					url: "/terms-of-use",
					controller:"TermsOfUseCtrl",
					templateUrl: "scripts/sections/terms/views/terms-of-useCtrl.html"
				})
//#state'

    });
})();

