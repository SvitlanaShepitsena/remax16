(function () {
    'use strict'

    angular.module('sections.privacy', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.privacy", {
                    url: "/privacy-policy",
                    controller: "PrivacyCtrl",
                    templateUrl: "scripts/sections/privacy/views/privacyCtrl.html"
                })
//#state'

        });
})();

