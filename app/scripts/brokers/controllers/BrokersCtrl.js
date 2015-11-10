(function () {
    'use strict';

    angular.module('brokers')
        .controller('BrokersCtrl', function ($scope, FbGenServ, homesUrl) {


            FbGenServ.getAssync(homesUrl + 'agents').then(function (agents) {
                $scope.agents = agents;
                FbGenServ.getAssync(homesUrl + 'sale').then(function (homes) {
                    var countSale = _.countBy(homes, function (home) {
                        return home.agent;
                    });

                    agents.forEach(function (agent) {
                        agent.countSale = countSale[agent.$id];
                    });
                }).catch(function (err) {
                    console.log('Error in getting agents list' + err.message);
                })
            }).catch(function (err) {
                console.log('Error in getting agents list' + err.message);
            })

        });
})();

