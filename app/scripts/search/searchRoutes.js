(function () {
    'use strict'
    angular.module('search', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            //#state'
                .state("app.remax-listings", {
                    abstract: true,
                    url: "/remax-listings",
                    templateUrl: "scripts/listings/views/listingsCtrl.html"
                })

                .state("app.remax-listings.search", {
                    url: "/search/*params",
                    controller: "SearchResultsCtrl",
                    templateUrl: "scripts/search/views/search-resultsCtrl.html"
                })

                .state("app.remax-listings.one-listing-sale", {
                    url: "/sale/:mls",
                    controller: "OneRemaxListingCtrl",
                    templateUrl: "scripts/listings/views/one-remax-listingCtrl.html"
                })
                .state("app.remax-listings.one-listing-rent", {
                    url: "/rent/:mls",
                    controller: "OneRemaxListingCtrl",
                    templateUrl: "scripts/listings/views/one-remax-listingCtrl.html"
                })
        });
})();

