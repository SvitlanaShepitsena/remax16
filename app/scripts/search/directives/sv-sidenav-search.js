(function () {
    'use strict';

    angular.module('search')
        .directive('svSidenavSearch', function (QueryServ, $rootScope, homesUrl,
                                                AgentServ, $location, UrlSeoConvertorServ,
                                                FbGenServ, SearchSaleServ, defaultImage, avatarBroker, $state, $mdSidenav) {
            function convertAutoCompletes(autos) {
                var cities = _.map(autos, function (auto) {
                    var city = auto.$id.trim();
                    return {
                        value: city.toLowerCase(),
                        display: _.capitalize(city)
                    };
                });
                return cities;
            }

            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-sidenav-search.html',
                scope: {},
                link: function ($scope, el, attrs) {
                    $rootScope.$watch('hmCnt', function (newValue, oldValue) {
                        if (newValue) {
                            $rootScope.cnt = {n: newValue};
                        }
                    });
                    $scope.typed = function () {
                        $scope.cities = $scope.citiesHidden;
                    };
                    $rootScope.$on('submit:form', function () {
                        $scope.runSearch($scope.query);
                    });
                    var rawLand;
                    $scope.$watch('query.saleRent', function (newValue, oldValue) {
                        //noinspection JSValidateTypes
                        if ($scope.types && newValue && newValue == 'sale') {
                            if (rawLand) {
                                var newTypes = [];
                                newTypes.push($scope.types[0]);
                                newTypes.push(rawLand);
                                newTypes = _.union(newTypes, _.rest($scope.types, 2));
                                $scope.types = newTypes;
                            }
                        }
                        if ($scope.types && newValue && newValue == 'rent') {
                            rawLand = _.pullAt($scope.types, 1)[0];
                        }
                    });
                    $scope.$on('query:changed', function (event, queryObj) {
                        $scope.query = QueryServ.get();
                    });
                    $scope.query = QueryServ.get();
                    /*Managing Angular Material Sidenavs Structure*/
                    $scope.isIe = AgentServ.isIe();
                    $scope.toggleLeft = function () {
                        $mdSidenav('left').toggle();
                    };
                    $scope.listing = {};
                    $scope.defImage = defaultImage;
                    $scope.avatarBroker = avatarBroker;
                    $scope.selectType = function (type) {
                        $scope.selectedType = type.$value;
                    };
                    $scope.getAutoLoads = function () {
                        FbGenServ.getAssync(homesUrl + 'autocomplete').then(function (results) {
                            $scope.citiesHidden = convertAutoCompletes(results);
                        });
                    }();
                    $scope.getTypes = function () {
                        return FbGenServ.getAssync(homesUrl + 'types').then(function (results) {
                            $scope.types = results;
                        });
                    };
                    $scope.getTypes();
                    var params = {type: 'sell'};
                    $scope.searchTextChange = function (searchText) {
                        //$scope.query.address = _.capitalize($scope.query.address);
                    };
                    $scope.querySearch = function (searchText) {
                        var mdRep;
                        mdRep = $('md-virtual-repeat-container');
                        var res = _.filter($scope.cities, function (city) {
                            return _.startsWith(city.value, searchText.toLowerCase());
                        });
                        if (searchText && !res.length) {
                            mdRep.hide();
                            var breakPoint = 1;
                        } else {
                            mdRep.show();
                        }
                        return res;
                    };
                    $scope.toggle = function (item, list) {
                        var idx = list.indexOf(item);
                        if (idx > -1) list.splice(idx, 1);
                        else list.push(item);
                    };
                    $scope.exists = function (item, list) {
                        return list.indexOf(item) > -1;
                    };

                    $scope.runSearch = function (query) {
                        var path = UrlSeoConvertorServ.parse(query);
                        if (path.length) {
                            QueryServ.set(query);
                            $state.go('app.remax-listings.search', {params: path}, {reload: false});
                            $mdSidenav('left').close();
                        } else {
                            $state.go('app.remax-listings.search', {params: 'all-homes-for-sale'});
                        }
                    };
                }
            };
        });
})();
