(function () {
    'use strict';

    angular.module('auth')
        .directive('svUniqueEmail', function ($q, $timeout, UserUniqueServ) {
            return {
                require: '?^ngModel',
                link: function ($scope, el, attrs, ctrl) {
                    ctrl.$asyncValidators.svUniqueEmail = function (modelValue, viewValue) {
                        modelValue = modelValue.trim().replace(/\s+/g, '-').toLowerCase();
                        if (modelValue === $scope.oldUserName) {
                            return $q.when(true);
                        } else {

                            return UserUniqueServ.isUserEmailUnique(modelValue);
                        }
                    };
                    ctrl.$formatters.push(function (modelValue) {
                        if (modelValue) {
                            return modelValue.replace(/\s+/g, '-').toLowerCase();
                        }
                    });
                    ctrl.$parsers.push(function (modelValue) {
                        if (modelValue) {
                            return modelValue.replace(/\s+/g, '-').toLowerCase();
                        }
                    });

                }
            };
        });
})();
