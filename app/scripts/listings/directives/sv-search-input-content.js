(function () {
    'use strict';

    angular.module('listings')
        .directive('svSearchInputContent', function ($rootScope, $location, QueryServ) {
            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-search-input-content.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    var cur = $location.$$path;
                    $scope.isRent = cur.indexOf('rent') > -1;
                    //$scope.isRent=cur.indexOf()
                    $rootScope.$watch('hmCnt', function (newValue, oldValue) {
                        if (newValue) {
                            var foundHomes = 0, nearByHomes = 0;
                            for (var i = 0; i < newValue.length; i++) {
                                var home = newValue[i];
                                if (home.distance) {
                                    nearByHomes++;
                                } else {
                                    foundHomes++;
                                }
                            }
                            $scope.cnt = foundHomes;
                            $scope.cntNearBy = nearByHomes;
                            if (foundHomes === 0 && nearByHomes === 0) {
                                var query = QueryServ.getString();

                                $scope.emptyNotice = "No results found for " + query;
                                $scope.emptyNoticeInput = "0 listings found";
                            }
                        }
                    });
                }
            };
        });
})();
