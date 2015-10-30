(function () {
    'use strict'

    angular.module('customers', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

				.state("app.customers-ctrl", {
					url: "/customers-ctrl", 
					controller:"CustomersCtrlCtrl",
					templateUrl: "scripts/customers/views/customers-ctrlCtrl.html"
				})
//#state'

    });
})();

