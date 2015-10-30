(function () {
    'use strict'

    angular.module('customers', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

				
				.state("app.customers", {
					url: "/customers", 
					controller:"CustomersCtrl",
					templateUrl: "scripts/customers/views/customersCtrl.html"
				})
//#state'

    });
})();
