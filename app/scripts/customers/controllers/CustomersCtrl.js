(function () {
    'use strict';

    angular.module('customers')
        .controller('CustomersCtrl', function ($scope, FbGenServ, url) {
            FbGenServ.getAssync(url + '/user-management/users', function (users) {
                users = users.map(function (user) {
                    if (user.profile.role === 'customer') {
                        return user ;
                    }
                });
                return _.compact(users);
            }).then(function (customers) {
                $scope.customers = customers;
                console.log(customers);
            })


        });
})();

