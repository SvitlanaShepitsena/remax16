'use strict'
var q = require('q');
var Firebase = require('firebase');
module.exports = {
    getAll: function (url) {

        var deferred = q.defer();
        var ref = new Firebase(url)

        ref.on("value", function (snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            },
            function (Error) {
                deferred.reject(Error);
            }
        );
        return deferred.promise;
    },
    getItem: function (url) {

        var deferred = q.defer();
        var ref = new Firebase(url)

        ref.on("value", function (snapshot) {
                var data = snapshot.val();
                deferred.resolve(data);
            },
            function (Error) {
                deferred.reject(Error);
            }
        );
        return deferred.promise;
    },
    updateItem: function (url,updateObj) {

        var deferred = q.defer();
        var ref = new Firebase(url);

        ref.set(updateObj, function () {
            console.log('success');
            deferred.resolve(true);
        });
        return deferred.promise;
    },
    removeItem: function (url) {

        var deferred = q.defer();
        var ref = new Firebase(url);

        ref.remove(function () {
            console.log('success');
            deferred.resolve(true);
        });
        return deferred.promise;
    }
}
