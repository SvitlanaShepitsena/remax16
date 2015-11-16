(function () {
    'use strict'

    angular.module('sections.about', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.about", {
                    url: "/about-remax-1st-class",
                    controller: "AboutCtrl",
                    templateUrl: "scripts/sections/about/views/aboutCtrl.html"
                })
                .state("app.about.google-analytics", {
                    url: "/google-analytics",
                    templateUrl: "scripts/sections/about/views/google-analyticsCtrl.html"
                })
        });
})();