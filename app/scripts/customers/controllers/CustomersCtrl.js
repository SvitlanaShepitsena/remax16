(function () {
    'use strict';

    angular.module('customers')
        .controller('CustomersCtrl', function ($scope, customers, url) {
            $scope.customers = customers;


        });
})();

