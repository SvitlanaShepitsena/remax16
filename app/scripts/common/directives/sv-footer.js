(function () {
    'use strict';

    angular.module('common')
        .directive('svFooter', function (companyPhone, companyFax) {
            return {
                replace: true,
                templateUrl: 'scripts/common/directives/sv-footer.html',
                scope: {

                },
                link: function ($scope, el, attrs) {
                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;

                }
            };
        });
})();
