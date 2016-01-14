(function () {
    'use strict';

    angular.module('customers')
        .controller('OneCustomerCtrl', function ($scope, customers, $stateParams) {
            var cid = $stateParams.cid;
            $scope.customer=_.find(customers, function (customer) {
                return customer.profile.userName===cid;
            });
            console.log($scope.customer);


        });
})();

