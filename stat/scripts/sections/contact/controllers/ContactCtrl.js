(function () {
    'use strict';
    angular.module('sections.contact')
        .controller('ContactCtrl', function ($scope, $mdDialog, companyName, companyStreetAddress, companyCity, companyState, companyZip, companyPhone, companyFax, companyEmail) {
            $scope.companyName = companyName;
            $scope.companyStreet = companyStreetAddress;
            $scope.companyCity = companyCity;
            $scope.companyState = companyState;
            $scope.companyZip = companyZip;
            $scope.companyPhone = companyPhone;
            $scope.companyFax = companyFax;
            $scope.companyEmail = companyEmail;

            $scope.showContactMapModal = function () {
                $mdDialog.show(
                    {
                        controller: ContactModalController,
                        templateUrl: 'scripts/sections/demographics/views/modalContactUsMap.html',
                    }
                );
            };
            function ContactModalController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        });
})();

