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
                    var tel = $scope.agent.defaultTel;
                    var phoneParameter = tel ? 'phone' + tel : null;
                    if (phoneParameter) {
                        $scope.contactPhone = $scope.agent[phoneParameter];

                    } else {
                        $scope.contactPhone = companyPhone;

                    }
                }
            };
        });
})();
