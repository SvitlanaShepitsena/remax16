(function () {
    'use strict';

    angular.module('brokers')
        .controller('BrokerActiveListingsCtrl', function ($scope, $rootScope) {
            $rootScope.$on('hide:listing:list', function () {
                $scope.hideListings = true;
            })

        });
})();

