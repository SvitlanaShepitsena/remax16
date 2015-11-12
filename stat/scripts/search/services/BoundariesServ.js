(function () {
    'use strict';
    angular.module('search')
        .factory('BoundariesServ', function ($q, $http,url, users, $firebaseObject, $firebaseArray) {
            return {
                get: function () {
                    return $q(function (resolve, reject) {
                        var query="https://maps.googleapis.com/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d41.818195013590476&2d-88.17243423924333&2m2&1d42.12322184780726&2d-87.34590991426887&2u13&4sen-US&5e0&6sm"%"40326000000&7b0&8e0&9b0&callback=_xdc_._j11vel&token=2726";
                            ;
                        $http.jsonp(query,{'Content-Type': 'application/json'}).success(function (res) {
                            console.log(res);
                        })
                    });
                }
            };
        });
})();
