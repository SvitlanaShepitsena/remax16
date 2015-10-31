(function () {
    'use strict';

    angular.module('customers')
        .directive('svCustomerProfileThumb', function (avatar) {
            return {
                replace: true,
                templateUrl: 'scripts/customers/directives/sv-customer-profile-thumb.html',
                scope: {
                    customer: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.avatar = avatar;
                }
            };
        });
})();
