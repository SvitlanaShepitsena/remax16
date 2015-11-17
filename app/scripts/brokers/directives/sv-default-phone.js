(function () {
    'use strict';

    angular.module('brokers')
        .directive('svDefaultPhone', function (userAuth, url, FbGenServ, $stateParams) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-default-phone.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id;
                    if (!userAuth.profile || !brokerId === userAuth.profile.brokerId) {
                        return;
                    }
                    $scope.phones = [{name: 'Office', value: '(847) 674-9797'}];
                    FbGenServ.getObject(url + 'homes/agents/' + userAuth.profile.brokerId).$loaded().then(function (broker) {
                        $scope.broker = broker;

                        _.forOwn(broker, function (val, prop) {
                            console.log(prop);
                            //if (prop.indexOf('phone') > -1) {
                            //    var phName = _.snakeCase(prop).split('_')[0];
                            //    $scope.phones.push({
                            //        name: _.capitalize(phName),
                            //        value: val
                            //    });
                            //    console.log(phone);
                            //}

                        })
                        console.log($scope.phones);

                    });


                }
            };
        });
})();
