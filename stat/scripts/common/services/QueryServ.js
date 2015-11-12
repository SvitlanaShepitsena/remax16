(function () {
    'use strict';
    angular.module('common')
        .factory('QueryServ', function ($q, url, users, $firebaseObject, $firebaseArray, UrlSeoConvertorServ) {
            var query;
            return {
                get: function () {
                    if (!query) {
                        query = {
                            saleRent: 'sale',
                            bedrooms: []
                        };
                    }
                    return query;
                },
                set: function (newQuery) {
                    query = _.assign(query, newQuery);
                },
                getString: function () {
                    var queryAddition;
                    var final = '';
                    var query = UrlSeoConvertorServ.parse(this.get());
                    var qArr = query.split('/');
                    for (var j = 1; j < qArr.length; j += 2) {
                        var type = qArr[j];
                        var value = qArr[j + 1];
                        if (type === 'bedrooms') {
                            if (value === '0') {
                                type = '';
                                value = 'Studio'
                            } else {
                                var storage = type;
                                type = value;
                                value = storage;
                            }

                        }

                        queryAddition = type + ' ' + value + ' & ';
                        final += queryAddition;
                    }
                    final = final.substr(0, final.length - 3);
                    var i = 9;
                    return final;

                },
                isRent: function () {

                    return this.get().saleRent === 'rent';
                }
            };
        });
})();
