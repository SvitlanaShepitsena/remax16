(function () {
    'use strict';

    angular.module('common')
        .directive('svFooter', function (companyPhone, companyFax, companyName) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-footer.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $scope.companyName = companyName
                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;

                }
            };
        });
})();
