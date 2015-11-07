(function () {
    'use strict'

    angular.module('sections.about', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.about", {
                    abstract: true,
                    url: "/about",
                    controller: "AboutCtrl",
                    templateUrl: "scripts/sections/about/views/aboutCtrl.html"
                })
                .state("app.about.about-tab-content", {
                    url: "/remax-1st-class",
                    templateUrl: "scripts/sections/about/views/about-tab-contentCtrl.html"
                })
                .state("app.about.about-company-tab-content", {
                    url: "/about-company",
                    controller: "AboutCompanyTabContentCtrl",
                    templateUrl: "scripts/sections/about/views/about-company-tab-contentCtrl.html"
                })
                .state("app.about.google-analytics", {
                    url: "/google-analytics",
                    templateUrl: "scripts/sections/about/views/google-analyticsCtrl.html"
                })
        });
})();
