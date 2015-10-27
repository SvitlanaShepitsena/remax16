(function () {
    'use strict';

    angular.module('auth.user')
        .controller('UserListingsCtrl', function ($scope, SearchSaleServ, userAuth) {
            SearchSaleServ.getBrokerHomes(userAuth.profile.email).then(function (brokerHomes) {
                $scope.brokerHomes = brokerHomes;
            });
        });
})();

