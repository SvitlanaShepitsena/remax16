(function () {
    'use strict'

    angular.module('customers', [])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("app.customers", {
                    url: "/customers",
                    resolve: {
                        customers: function (FbGenServ, url) {
                            return FbGenServ.getAssync(url + '/user-management/users', function (users) {
                                users = users.map(function (user) {
                                    if (user.profile.role === 'customer') {
                                        return user;
                                    }
                                });
                                return _.compact(users);
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                    },
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
                    url: "/:cid",
                    controller: "OneCustomerCtrl",
                    templateUrl: "scripts/customers/views/one-customerCtrl.html"
                })
//#state'

        });
})();