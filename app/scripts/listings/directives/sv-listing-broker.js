(function () {
    'use strict';
    angular.module('listings')
        .directive('svListingBroker', function (userAuth, companyPhone) {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-listing-broker.html',
                link: function ($scope, el, attrs) {
                    var tel = $scope.home.agentObj.defaultTel;
                    var phoneParameter = tel ? 'phone' + tel : null;
                    if (phoneParameter) {
                        $scope.contactPhone = $scope.home.agentObj[phoneParameter];

                    } else {
                        $scope.contactPhone = companyPhone;

                    }
                }
            };
        });
})();
