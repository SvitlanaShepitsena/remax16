(function () {
    'use strict';

    angular.module('brokers')
        .directive('svDefaultPhone', function () {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-default-phone.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
