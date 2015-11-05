(function () {
    'use strict';
    angular.module('common')
        .factory('VMServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
            var vmPrev;
            var vm;
            return {
                set: function (brokerChanged) {
                    if (vm) {
                        vmPrev = _.clone(vm, true);

                    }
                    vm = _.clone(brokerChanged, true);
                },
                get: function () {
                    return vm;
                },
                getPrevious: function () {
                    vm = vmPrev;


                    return vmPrev;
                }
            };
        });
})();
