(function () {
    'use strict';

    angular.module('listings')
        .directive('svHomesAdvise', function () {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-homes-advise.html',
                scope: {

                },
                link: function ($scope, el, attrs) {

                }
            };
        });
})();
