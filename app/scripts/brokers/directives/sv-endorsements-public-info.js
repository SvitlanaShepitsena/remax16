(function () {
    'use strict';

    angular.module('brokers')
        .directive('svEndorsementsPublicInfo', function ($mdDialog, FbGenServ, $sce, url, userAuth, $stateParams, VMServ) {
            return {
                replace: true,
                templateUrl: 'scripts/brokers/directives/sv-endorsements-public-info.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var brokerId = $stateParams.id ? $stateParams.id : userAuth.profile.$id;
                    FbGenServ.getAssync(url + 'blogs', function (blogs) {
                        return _.where(blogs, {brokerId: brokerId, endorsements: true});
                    }).then(function (brokerEndBlogs) {
                        $scope.loaded = true;
                        $scope.endorsements = brokerEndBlogs;
                    })

                    $scope.safeParsing = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                    $scope.showEndorsementsModal = function (e) {
                        VMServ.set(e);
                        $mdDialog.show(
                            {
                                controller: EndorsementsController,
                                templateUrl: 'scripts/brokers/views/modalEndorsements.html',
                            }
                        );
                    };

                    function EndorsementsController($scope, $mdDialog, VMServ, $sce) {
                        $scope.safeParsing = function (html) {
                            return $sce.trustAsHtml(html);
                        };
                        $scope.e = VMServ.get();
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancelModal = function () {
                            $mdDialog.cancel();
                        };
                    }

                }
            };
        });
})();
