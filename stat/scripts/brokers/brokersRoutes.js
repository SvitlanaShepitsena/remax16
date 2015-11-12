(function () {
    'use strict'

    angular.module('brokers', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("app.brokers", {
                    url: "/brokers",
                    onEnter: function ($rootScope) {
                        $rootScope.underBrokers = true;

                    },
                    onExit: function ($rootScope) {
                        $rootScope.underBrokers = false;

                    },
                    controller: "BrokersCtrl",
                    templateUrl: "scripts/brokers/views/brokersCtrl.html"
                })
                .state("app.brokers.broker", {
                    url: "/:id",
                    abstract: true,
                    controller: "OneBrokerCtrl",
                    templateUrl: "scripts/brokers/views/one-brokerCtrl.html"
                })
                .state("app.brokers.broker.profile", {
                    url: "/profile",
                    template: "<sv-broker-profile-info></sv-broker-profile-info>"
                })
                .state("app.brokers.broker.listings", {
                    url: "/listings",
                    template: "<sv-listings-list></sv-listings-list>"
                })
                .state("app.brokers.broker.blogs", {
                    url: "/blog",
                    template: "<sv-blogs-list></sv-blogs-list>"
                })
                .state("app.brokers.broker.reviews", {
                    url: "/reviews",
                    template: "<sv-reviews-public-info></sv-reviews-public-info>"
                })


//#state'

        });
})();

