(function () {
    'use strict'

    angular.module('customers', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("app.customers", {
                    url: "/customers",
                    onEnter: function ($rootScope) {
                        $rootScope.underCustomers = true;
                    },
                    onExit: function ($rootScope) {
                        $rootScope.underCustomers = false;
                    },
                    controller: "CustomersCtrl",
                    templateUrl: "scripts/customers/views/customersCtrl.html"
                })
                .state("app.customers.one-customer", {
                    url: "/customer",
                    controller: "OneCustomerCtrl",
                    templateUrl: "scripts/customers/views/one-customerCtrl.html"
                })
				.state("app.customer-bookmarks", {
					url: "/customer-bookmarks", 
					controller:"CustomerBookmarksCtrl",
					templateUrl: "scripts/customers/views/customer-bookmarksCtrl.html"
				})
//#state'

        });
})();
