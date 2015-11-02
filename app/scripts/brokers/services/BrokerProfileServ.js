(function () {
    'use strict';
    angular.module('brokers')
        .factory('BrokerProfileServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
            var brokerPrev;
            var broker;
            return {
                set: function (brokerChanged) {
                    if (broker) {
                        brokerPrev = _.clone(broker, true);

                    }
                    broker = _.clone(brokerChanged, true);
                },
                get: function () {
                    return broker;
                },
                getPrevious: function () {
                    broker = brokerPrev;


                    return brokerPrev;
                }
            };
        });
})();
