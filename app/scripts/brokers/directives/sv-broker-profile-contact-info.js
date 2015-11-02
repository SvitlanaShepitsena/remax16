(function () {
    'use strict';
    angular.module('brokers')
        .directive('svBrokerProfileContactInfo', function (FbGenServ, $timeout, homesUrl, userAuth, $mdDialog, toastr, companyPhone, companyFax, defaultBrokerTitle) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-broker-profile-contact-ifo.html',
                link: function ($scope, el, attrs) {
                    $scope.companyPhone = companyPhone;
                    $scope.companyFax = companyFax;
                    $scope.defaultBrokerTitle = defaultBrokerTitle;

                    $scope.saveProfile = function (img) {
                        if (img) {
                            $scope.broker.pic = img.img;
                        }
                        FbGenServ.saveObject(homesUrl + 'agents/' + userAuth.profile.brokerId, $scope.broker).then(function (ref) {
                            toastr.success('Changes have been saved');
                            if ($scope.newImg) {
                                $scope.broker.pic = '';
                                $timeout(function () {
                                    $scope.broker.pic = $scope.newImg.img + '?' + Math.random();
                                }, 300);
                            }
                        });
                        $scope.editState = false;
                    };
                    $scope.$on('broker:changed', function (evt, img) {
                        $scope.saveProfile(img);
                        $scope.newImg = img;
                    });
                    /*Upload Image*/
                    $scope.showBrokerUploadImgModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerUploadImgController,
                                templateUrl: 'scripts/brokers/views/modalBrokerUploadImg.html',
                            }
                        );
                    };
                    function BrokerUploadImgController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function (img) {
                            $rootScope.$broadcast('broker:changed', {img: img});
                            $mdDialog.hide();
                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                    /*Contact Info*/
                    $scope.showBrokerContactInfoModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerContactInfoController,
                                templateUrl: 'scripts/brokers/views/modalBrokerContactInfo.html',
                            }
                        );
                    };

                    function BrokerContactInfoController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }

                    /*Highlights*/
                    $scope.showBrokerProfileHighlightsModal = function (broker) {
                        $mdDialog.show(
                            {
                                broker: broker,
                                controller: BrokerProfileHighlightsController,
                                templateUrl: 'scripts/brokers/views/modalBrokerProfileHighlights.html',
                            }
                        );
                    };

                    function BrokerProfileHighlightsController($scope, $mdDialog, broker, $rootScope) {
                        $scope.broker = broker;
                        $scope.saveProfileModal = function () {
                            $rootScope.$broadcast('broker:changed');
                            $mdDialog.hide();


                        };
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    }
                }

            };
        });
})();
