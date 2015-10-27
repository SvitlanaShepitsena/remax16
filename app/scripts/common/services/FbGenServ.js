(function () {
	'use strict';
	angular.module('common')
		.factory('FbGenServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
			return {
				getAssync: function (fbUrl, filter) {
					return $q(function (resolve, reject) {
						var arr = $firebaseArray(new Firebase(fbUrl));
						arr.$loaded().then(function (results) {
							if (filter) {
								results = filter(results);
							}
							resolve(results);
						}).catch(function (error) {
							reject(error);
						});
					});
				},
				saveObject: function (fbUrl, newObject) {
					return $q(function (resolve, reject) {
						var fbObj = $firebaseObject(new Firebase(fbUrl));
						fbObj.$loaded().then(function () {
							_.extend(fbObj, newObject)
							fbObj.$save().then(function (ref) {
								resolve(ref);
							})
						}).catch(function (error) {
							reject(error);
						});
					});
				}
			};
		});
})();
