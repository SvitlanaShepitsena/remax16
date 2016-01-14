(function () {
    'use strict'
    angular.module('search', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            //#state'

                .state("app.search", {
                    url: "/search/*params",
                    controller: "SearchResultsCtrl",
                    templateUrl: "scripts/search/views/search-resultsCtrl.html"
                })

                .state("app.one-listing-sale", {
                    url: "/homes-for-sale/:mls",
                    controller: "OneRemaxListingCtrl",
                    templateUrl: "scripts/listings/views/one-remax-listingCtrl.html"
                })
                .state("app.one-listing-rent", {
                    url: "/homes-for-rent/:mls",
                    controller: "OneRemaxListingCtrl",
                    templateUrl: "scripts/listings/views/one-remax-listingCtrl.html"
                })
        });
})();

