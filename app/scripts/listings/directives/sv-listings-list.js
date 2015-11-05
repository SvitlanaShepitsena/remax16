(function () {
    'use strict';
    function updateClusters($scope) {
        var newValue = $scope.markerClusterer.clusters_;
        if (newValue.length === 0) {
            return;
        } else {
            var shortPos = [];
            for (var i = 0; i < newValue.length; i++) {
                var cluster = newValue[i];
                if (cluster.markers_)
                    for (var j = 0; j < cluster.markers_.length; j++) {
                        var obj = cluster.markers_[j];
                        shortPos.push(obj);
                    }
            }
            $scope.shPoses = [];
            for (var i = 0; i < $scope.positions.length; i++) {
                var onePos = $scope.positions[i];
                if (!onePos) {
                    continue;
                }
                var found = false;
                for (var j = 0; j < shortPos.length; j++) {
                    var onePosShort = shortPos[j];
                    if (onePos.id == onePosShort.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $scope.shPoses.push(onePos);
                }
            }
        }
    }

    function removeMarkersInClusters($timeout, $scope) {
        $timeout(function () {
            updateClusters($scope);
        }, 400);
    }

    function generateIcon(home, icon) {
        var iconLink;
        switch (home.type) {
            case "Single Family Home":
                iconLink = icon.sHome;
                break;
            case "Multi-Family Home":
                iconLink = icon.mHome;
                break;
            case "Townhouse":
                iconLink = icon.townhouse;
                break;
            case "Duplex":
                iconLink = icon.duplex;
                break;
            case "Condominium Unit":
                iconLink = icon.condo;
                break;
            case "Raw Land":
                iconLink = icon.land;
                break;
            default:
                iconLink = icon.sHome;
        }
        return iconLink;
    }

    angular.module('listings')
        .directive('svListingsList', function (BoundariesServ, avatarBroker, userAuth, url, FbGenServ, mapStyler, icon, $rootScope, googleMap, QueryServ, $timeout, $stateParams, SearchSaleServ, GeoServ, $window, localStorageService, $filter, defaultImage, SortServ) {
            function centerMapToBounds(newValue, $scope) {
                var bounds = new google.maps.LatLngBounds();
                newValue.forEach((place) => {
                    if (place && place.position) {
                        bounds.extend(place.position);
                    }
                });
                if (newValue.length === 3) {

                    $scope.map.fitBounds(bounds);
                    $scope.map.setZoom(10);
                } else {

                    $scope.map.fitBounds(bounds);
                }
            }

            return {
                replace: true,
                templateUrl: 'scripts/listings/directives/sv-listings-list.html',
                controller: function ($scope) {
                    $scope.mapStyler = mapStyler;

                    this.getHomes = function () {
                        return $scope.homes;
                    }
                },
                scope: {
                    bookmarks: '='
                },
                link: function ($scope, el, attrs) {
                    $scope.underBrokers = $rootScope.underBrokers;
                    $scope.isBroker = $stateParams.id;
                    $scope.avatarBroker = avatarBroker;
                    $scope.isRent = QueryServ.isRent();
                    $scope.sortBy = localStorageService.get('sortBy') || 'daysOnSite';
                    $scope.$on('sort:homes', function (evt, sortBy) {
                        $scope.homes = SortServ.sort($scope.homes, sortBy);
                    })
                    $scope.boundsChanged = function () {
                        console.log('changed');
                    };
                    $scope.mapStyle = {height: Math.floor($window.innerHeight * .8) + 'px'};
                    if (!$scope.isBroker) {
                        var viewType = localStorageService.get('mapView');
                        $scope.mapView = (!(!viewType || viewType == 'grid'));
                    } else {
                        $scope.mapView = 'grid';
                    }
                    $scope.googleMap = googleMap;
                    $scope.googleMapsUrl = "http://maps.google.com/maps/api/js?key=AIzaSyAoZAEJhhT8_oquhNjmpdNvLgbvlCbeSAc";
                    $scope.iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                    function getLocation() {
                        var location;
                        var params = $stateParams.params;
                        if (!params || params === 'all-homes-for-sale') {
                            return 'Chicago';
                        }
                        var start = params.indexOf('address');
                        start = params.indexOf('/', start) + 1;
                        var finish = params.indexOf('/', start);
                        if (finish === -1) {
                            location = params.substring(start);
                        } else {
                            location = params.substring(start, finish);
                        }
                        location = location.replace(/-+/g, ' ');
                        return location;
                    }

                    var chicago;
                    $scope.$on('mapInitialized', function (event, map) {
                        $scope.map = map;
                    });
                    $scope.$on('mapGrid:changed', function (event, isMap) {
                        $scope.mapView = isMap;
                    });
                    SearchSaleServ.getHomes($stateParams, $scope.isBroker, $scope.bookmarks).then(function (homes) {

                        if (userAuth.profile) {
                            var bkmPath = url + 'bookmarks/' + userAuth.profile.userName;
                            FbGenServ.getAssync(bkmPath).then(function (bookmarks) {
                                $scope.bookmarks = _.pluck(bookmarks, '$id');
                            })
                        }
                        $scope.$on('bookmark:deleted', function (evt, bkmId) {
                            for (var n = 0; n < $scope.homes.length; n++) {
                                var home = $scope.homes[n];
                                if (home.$id === bkmId) {
                                    $scope.homes.splice(n, 1);
                                    break;

                                }

                            }
                        });


                        $scope.avatarBroker = avatarBroker;
                        $rootScope.hmCnt = homes;
                        if (!homes || homes.length === 0) {
                            //$scope.$broadcast('homes:loaded', {numb:0});
                            $timeout(function () {
                                if ($scope.map) {
                                    $scope.map.setCenter(new google.maps.LatLng(42.008871225891134, -87.93649894999999));
                                    $scope.map.setZoom(9);
                                }
                            }, 700);
                        }
                        $scope.homes = SortServ.sort(homes, $scope.sortBy);
                        $scope.infoWindowMap = new Map();
                        $scope.positions = _.map($scope.homes, function (home) {
                            var pos = home.geo;
                            if (!pos) {
                                return;
                            }
                            var latLng = new google.maps.LatLng(pos.lat, pos.lng);
                            var marker = new google.maps.Marker({
                                position: latLng,
                                icon: generateIcon(home, icon)
                            });
                            marker.id = home.$id;
                            var url = home.images ? home.images[0] : defaultImage;
                            var href = "/remax-listings/" + (home.isRent ? 'rent/' : 'sale/') + home.mls + '/';
                            $scope.infoWindowMap.set(marker.id, new google.maps.InfoWindow({
                                content: `
                                <div style="margin-bottom:4px">
                                    <div class="map-pointer-text-wrapper" style="padding-top: 5px;">
                                        <a href="${href}" target="_blank">
                                            <div class="i-map-wrapper-style" style="vertical-align: top">
                                                <i style="background-image:url('${url}')" class="i-map-style"></i>
                                             </div>
                                        </a>
                                    </div>
                                    <div class="map-pointer-text-wrapper" style="vertical-align: top;">
                                        <a href="${href}" style="text-decoration:none" target="_blank">
                                            <div style="font-size:15px;font-weight:600;color:#1e88e5">${$filter("currency")(home.price, "$", 0)} </div>
                                            <div >
                                                <span>For ${home.isRent ? 'Rent' : 'Sale'}</span>

                                                <span style="font-size:12px;color:#393939"> ${home.type}</span>

                                            </div>
                                            <div style="font-weight:500;color:#393939">${home.address.city},${home.address.zip}</div>
                                            <div style="font-weight:500;color:#393939">${home.address.street}</div>
                                            <div style="font-size:12px;color:#696969;font-weight:500">
                                                <span style="font-weight:500" ng-if="home.beds">
                                                    <i class='fa fa-circle' style="font-size: 8px"></i>
                                                    &nbsp
                                                    Beds:
                                                </span>
                                                <span>
                                                    ${home.beds != 'n/a' ? home.beds : ''}
                                                    &nbsp
                                                </span>
                                                <span style="font-weight:500" ng-if="home.bath">
                                                    <i class='fa fa-circle' style="font-size: 8px"></i>
                                                    &nbsp
                                                    Baths:
                                                </span>
                                                <span>
                                                    ${home.bath != 'n/a' ? home.bath : ''}
                                                </span>
                                             </div>
                                        </a>
                                    </div>
                                </div>
                                <hr/>

                                <a href="/brokers/${home.agent}/profile" style="text-decoration:none">
                                <img style="display:inline-block; vertical-align: middle;width:28px;margin-top:8px" src="${home.agentObj.pic || avatarBroker} " alt="">
                                <div style="display:inline-block;vertical-align: middle;font-weight:500">
                                   ${home.agentObj.fName} ${home.agentObj.lName}
                                </div>
                                <div style="display:inline-block;float: right">
                                  <div style="margin-top:8px;">
                                      <i class="fa fa-phone"></i>
                                      (847) 674-9797
                                  </div>
                                </div>
                                </a>

                                    ${pos.pano ? '<div id="pano" style="width:400px;height:200px"></div>' : ''}
							 `
                            }));
                            $scope.deaf = false;
                            function isInfoWindowOpen(infoWindow) {
                                var map = infoWindow.getMap();
                                return (map !== null && typeof map !== "undefined");
                            }

                            marker.addListener('mouseover', function () {
                                if ($scope.deaf || $scope.activeMarkerId == marker.id) {
                                    return;
                                }


                                $scope.deaf = true;
                                var infoWindow = $scope.infoWindowMap.get(marker.id);
                                $scope.infoWindowMap.forEach(function (infoWin) {
                                    if (infoWin != infoWindow) {
                                        infoWin.close();
                                    } else {

                                        if (!isInfoWindowOpen(infoWin)) {

                                            infoWin.open($scope.map, marker);
                                            google.maps.event.addListener(infoWin, 'closeclick', function () {
                                                $scope.activeMarkerId = 0;
                                                // then, remove the infowindows name from the array
                                            });
                                            $scope.activeMarkerId = marker.id
                                        }
                                    }
                                });
                                $timeout(function () {
                                    $scope.deaf = false;

                                }, 800);

                                if (pos.pano) {

                                    var panorama = new google.maps.StreetViewPanorama(
                                        document.getElementById('pano'), {
                                            position: pos.pano,
                                            fullScreenControl: false,
                                            addressControl: false
                                        });


                                    google.maps.event.addListenerOnce(panorama, 'status_changed', function () {

                                        var loc = panorama.getLocation();
                                        if (loc) {
                                            var heading = google.maps.geometry.spherical.computeHeading(loc.latLng, latLng);
                                            panorama.setPov({
                                                heading: heading,
                                                pitch: 0
                                            });

                                        } else {
                                            panorama.setVisible(false);
                                        }
                                    });


                                }

                            });
                            return marker;
                        });
                    });

                    function getAngle(from, to) {
                        function wrapAngle(angle) {
                            if (angle >= 360) {
                                angle -= 360;
                            } else if (angle < 0) {
                                angle += 360;
                            }
                            return angle;
                        }

                        var DEGREE_PER_RADIAN = 57.2957795, RADIAN_PER_DEGREE = 0.017453;
                        var dLat = to.lat() - from.lat(), dLng = to.lng() - from.lng();
                        var yaw = Math.atan2(dLng * Math.cos(to.lat() * RADIAN_PER_DEGREE),
                                dLat) * DEGREE_PER_RADIAN;
                        return wrapAngle(yaw);
                    }


                    $scope.$watch('positions', function (newValue, oldValue) {
                        if (!newValue) {
                            return;
                        }
                        if ($scope.map) {
                            $scope.markerClusterer = new MarkerClusterer($scope.map, _.compact($scope.positions), {maxZoom: 12});
                            centerMapToBounds(newValue, $scope);
                            removeMarkersInClusters($timeout, $scope);
                        } else {
                            $scope.$on('mapInitialized', function (event, map) {
                                $scope.map = $scope.map || map;
                                $scope.markerClusterer = new MarkerClusterer($scope.map, _.compact($scope.positions), {maxZoom: 12});
                                centerMapToBounds(newValue, $scope);
                                removeMarkersInClusters($timeout, $scope);
                            });
                        }
                    });
                    $scope.zoomChanged = function () {


                        if (!$scope.clustersBuilt) {
                            return;
                        }

                        $timeout(function () {
                            updateClusters($scope);
                        }, 400);

                    };
                }
            };
        });
})();
