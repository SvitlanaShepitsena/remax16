(function () {
    'use strict';

    angular.module('auth')
        .directive('svUniqueEmail', function () {
            return {
                require: '?^ngModel',
                link: function ($scope, el, attrs, ctrl) {

                }
            };
        });
})();
