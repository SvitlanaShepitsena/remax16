(function () {
    'use strict';
    angular.module('search')
        .factory('SearchFilterServ', function ($q, url, users, $firebaseObject, $firebaseArray, UrlSeoConvertorServ) {
            function contains(hay, needle) {
                hay = hay.trim();
                return hay.toLowerCase().indexOf(needle.toLowerCase()) > -1;
            }

            return {
                byAddress: function (homes, address) {
                    if (!address) {
                        return homes;
                    }
                    var shortList = [],
                        addressesParts = [];

                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        addressesParts = address.split(' ');
                        for (var j = 0; j < addressesParts.length; j++) {
                            var addressPart = addressesParts[j];

                            if (contains(home.address.city, addressPart)) {
                                shortList.push(home);
                                continue;
                            }

                            if (contains(home.address.zip, addressPart)) {
                                shortList.push(home);
                                continue;
                            }
                            if (contains(home.address.state, addressPart)) {
                                shortList.push(home);
                                continue;
                            }
                        }
                    }
                    return shortList;
                },
                byMaxPrice: function (homes, maxPrice) {
                    if (!maxPrice) {
                        return homes;
                    }
                    var shortList = [];
                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        if (!home.price) {
                            shortList.push(home);
                            continue;
                        }
                        try {
                            var price = parseInt(home.price);
                            var max = parseInt(maxPrice);
                            if (price <= max) {
                                shortList.push(home);
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    return shortList;
                },
                byMinBeds: function (homes, minBeds) {
                    if (!minBeds) {
                        return homes;
                    }
                    var shortList = [];
                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        if (!home.beds || home.beds === 'n\\a') {
                            shortList.push(home);
                            continue;
                        }
                        try {
                            var beds = parseInt(home.beds);
                            var min = parseInt(minBeds);
                            if (beds >= min) {
                                shortList.push(home);
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    return shortList;
                },
                byBedrooms: function (homes, bedrooms) {
                    if (!bedrooms) {
                        return homes;
                    }
                    var bedroomsArr = bedrooms.split('-').map(function(bed) {
                        return parseInt(bed);
                    });
                    var maxBeds = _.max(bedroomsArr);

                    var breakPoint = 1;
                    var shortList = [];
                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        if (!home.beds || home.beds === 'n\\a') {
                            shortList.push(home);
                            continue;
                        }
                        try {
                            var beds = parseInt(home.beds);
                            if (isNaN(beds) || bedroomsArr.indexOf(beds) > -1 || (maxBeds === 4 && beds >= 4)) {
                                shortList.push(home);
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    return shortList;
                },
                byType: function (homes, type) {
                    if (!type || type === 'Any') {
                        return homes;
                    }
                    var shortList = [];
                    for (var i = 0; i < homes.length; i++) {
                        var home = homes[i];
                        if (contains(home.type, type)) {
                            shortList.push(home);
                        }
                    }
                    return shortList;
                },
            };
        });
})();
