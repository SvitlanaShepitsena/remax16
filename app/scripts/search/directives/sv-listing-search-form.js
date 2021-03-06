(function () {
    'use strict';
    angular.module('search')
        .directive('svListingSearchForm', function ($location, homesUrl, UrlSeoConvertorServ, FbGenServ, SearchSaleServ, defaultImage, avatarBroker, $state, QueryServ) {
            function convertAutoCompletes(autos) {
                var cities = _.map(autos, function (auto) {
                    var city = auto.$id.trim();
                    return {
                        value: city.toLowerCase(),
                        display: city
                    };
                });
                return cities;
            }

            return {
                replace: true,
                templateUrl: 'scripts/search/directives/sv-listing-search-form.html',
                scope: {
                    inline: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.query = QueryServ.get();
                    $scope.saleRent = function (saleOrRent) {
                        $scope.query = $scope.query || QueryServ.get();
                        $scope.query.saleRent = saleOrRent;
                    };
                    $scope.listing = {};
                    $scope.defImage = defaultImage;
                    $scope.avatarBroker = avatarBroker;
                    $scope.selectType = function (type) {
                        $scope.selectedType = type.$value;
                    };
                    $scope.getAutoLoads = function () {
                        FbGenServ.getAssync(homesUrl + 'autocomplete').then(function (results) {
                            $scope.cities = convertAutoCompletes(results);
                        });
                    }();
                    $scope.getTypes = function () {
                        return FbGenServ.getAssync(homesUrl + 'types').then(function (results) {
                            $scope.types = results;
                        });
                    };
                    var params = {type: 'sell'};
                    $scope.searchTextChange = function (searchText) {
                        //console.log(searchText);
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
                    $scope.runSearch = function (query) {
                        var path = UrlSeoConvertorServ.parse(query);
                        if (path.length) {
                            QueryServ.set(query);
                            $state.go('app.search', {params: path});
                        } else {
                            $state.go('app.search', {params: 'all-homes-for-sale'});
                        }
                    };
                }
            };
        });
})();
