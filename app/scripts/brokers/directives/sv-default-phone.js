(function () {
    'use strict';

    angular.module('brokers')
        .directive('svDefaultPhone', function (userAuth, url, FbGenServ, $stateParams, companyFax) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-default-phone.html',
                scope: {
                    broker: '=',
                    editRight: '='
                },
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id;
                    $scope.companyFax = companyFax;

                    var phones = [{name: 'Office', value: '(847) 674-9797'}];
                    _.forOwn($scope.broker, function (val, prop) {
                        if (prop.indexOf('phone') > -1) {
                            var phName = _.snakeCase(prop).split('_')[1];
                            phones.push({
                                name: _.capitalize(phName),
                                value: val
                            });
                        }
                    });
                    $scope.phones = phones;

                    $scope.makeDefault = function (phone) {
                        var brokerUrl = url + 'homes/agents/' + $scope.broker.$id;
                        FbGenServ.saveObject(brokerUrl, {defaultTel: phone.name});
                    };
                }
            };
        });
})();
