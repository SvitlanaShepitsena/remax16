(function () {
    'use strict'
    angular.module('common', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("app.section", {
                    url: "/sections/:sectionName",
                    controller: "SectionCtrl",
                    templateUrl: "scripts/common/views/sectionCtrl.html"
                })
                .state("app.ga", {
                    url: "/svet-analytics-data",
                    controller: "GaCtrl",
                    templateUrl: "scripts/common/views/gaCtrl.html"
                })
//#state'
        });
})();