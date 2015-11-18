(function () {
    'use strict';

    angular.module('brokers')
        .directive('svDefaultPhone', function (userAuth, url, FbGenServ, $stateParams) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-default-phone.html',
                scope: {
                    broker: '='
                },
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id;
                    if (!userAuth.profile || !brokerId === userAuth.profile.brokerId) {
                        return;
                    }
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
                    console.log(phones);



                }
            };
        });
})();
