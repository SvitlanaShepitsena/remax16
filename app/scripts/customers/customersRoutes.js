(function () {
    'use strict'

    angular.module('customers', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("app.customers", {
                    url: "/customers",
                    controller: "CustomersCtrl",
                    templateUrl: "scripts/customers/views/customersCtrl.html"
                })
				.state("app.one-customer", {
					url: "/one-customer", 
					controller:"OneCustomerCtrl",
					templateUrl: "scripts/customers/views/one-customerCtrl.html"
				})
//#state'

        });
})();
