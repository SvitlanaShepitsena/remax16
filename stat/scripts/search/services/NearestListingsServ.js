(function () {
    'use strict';
    angular.module('search')
        .factory('NearestListingsServ', function ($q, distanceToNearest, url, users, $firebaseObject, $firebaseArray) {
            function geoToLatLng(placeToSearch) {
                if (placeToSearch.lat) {
                    return new google.maps.LatLng(placeToSearch.lat, placeToSearch.lng);

                }
                var location = placeToSearch.geometry.location;
                return new google.maps.LatLng(location.lat(), location.lng());
            }

            return {
                find: function (address, allHomes) {
                    return $q(function (resolve, reject) {
                        var geoCoder = new google.maps.Geocoder();
                        var nearest = [];
                        geoCoder.geocode({address}, function (results, status) {
                            if (status == 'OK') {
                                var placeToSearch = results[0];
                                var placeLatLng = geoToLatLng(placeToSearch);
                                for (var i = 0; i < allHomes.length; i++) {
                                    var home = allHomes[i];
                                    var homeLatLng = geoToLatLng(home.geo);
                                    var distance = google.maps.geometry.spherical.computeDistanceBetween(
                                        placeLatLng,
                                        homeLatLng
                                    );
                                    home.distance = distance;
                                    if (distance <= distanceToNearest) {
                                        nearest.push(home);
                                    }
                                }
                                if (nearest.length) {
                                    resolve(_.sortBy(nearest,distance));
                                } else{

                                var nearestHomes = _.sortBy(allHomes, 'distance');
                                    resolve(_.take(nearestHomes,1));
                                }

                            }


                        });
                        //console.log(placeToSearchAround);
                        //resolve(placeToSearchAround);
                    });
                }
            };
        });
})();
