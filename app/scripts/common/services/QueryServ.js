(function () {
	'use strict';
	angular.module('common')
		.factory('QueryServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
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
				isRent: function () {

					return this.get().saleRent === 'rent';
				}
			};
		});
})();
