(function () {
    'use strict';
    angular.module('brokers')
        .directive('svBrokerProfileContactInfo', function (BrokerProfileServ, $stateParams, FbGenServ, $timeout, homesUrl, userAuth, $mdDialog, toastr, companyPhone, companyFax, defaultBrokerTitle) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-profile-contact-info.html',
                link: function ($scope, el, attrs) {
                    BrokerProfileServ.set($scope.broker);

                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;
                    $scope.defaultBrokerTitle = defaultBrokerTitle;

                    FbGenServ.getAssync(homesUrl + 'sale', function (homes) {
                        var bHomes = (_.filter(homes, function (home) {
                            return home.agent === $stateParams.id;
                        }));
                        return bHomes.length;
                    }).then(function (brokerHomesCount) {
                        $scope.brokerHomesCount = brokerHomesCount;
                    })


                    /*Upload Image*/
                    $scope.showBrokerUploadImgModal = function () {
                        $mdDialog.show(
                            {
                                controller: BrokerUploadImgController,
                                templateUrl: 'scripts/brokers/views/modalBrokerUploadImg.html',
                            }
                        );
                    };
                    function BrokerUploadImgController($scope, $mdDialog, $rootScope, BrokerProfileServ) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModalImg = function (img) {
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();
                        };
                        $scope.hide = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                    /*Contact Info*/
                    $scope.showBrokerContactInfoModal = function () {
                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerContactInfoController,
                                templateUrl: 'scripts/brokers/views/modalBrokerContactInfo.html',
                            }
                        );
                    };

                    function BrokerContactInfoController($scope, $mdDialog, $rootScope, BrokerProfileServ) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed', $scope.brokerModal);
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.hide();
                        };
                        $scope.cancelModal = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }

                    /*Highlights*/
                    $scope.showBrokerProfileHighlightsModal = function () {
                        BrokerProfileServ.set(BrokerProfileServ.get());
                        $mdDialog.show(
                            {
                                controller: BrokerProfileHighlightsController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfileHighlights.html',
                            }
                        );
                    };

                    function BrokerProfileHighlightsController($scope, $mdDialog,  $rootScope,BrokerProfileServ) {
                        $scope.brokerModal = BrokerProfileServ.get();
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                        };
                        $scope.cancel = function () {
                            $scope.brokerModal = BrokerProfileServ.getPrevious();
                            $mdDialog.cancel();
                        };
                    }
                }

            };
        });
})();
