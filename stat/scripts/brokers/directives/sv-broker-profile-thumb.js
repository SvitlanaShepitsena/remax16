(function () {
    'use strict';

    angular.module('brokers')
        .directive('svBrokerProfileThumb', function (avatarBroker, companyPhone) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-profile-thumb.html',
                link: function ($scope, el, attrs) {
                    $scope.avatarBroker = avatarBroker;
                    $scope.companyPhone = companyPhone;

                }
            };
        });
})();
