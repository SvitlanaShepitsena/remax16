(function () {
	'use strict';
	angular.module('listings')
		.factory('SortServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
			return {
				sort: function (homes, sortBy) {
					switch (sortBy) {
						case 'daysOnSite':
							homes = _.sortBy(homes, function (home) {
								return parseInt(home.daysOnSite);
							});
							break;
						case 'priceLow':
							homes = _.sortBy(homes, function (home) {
								return parseInt(home.price);
							});
							break;
						case 'priceHigh':
							homes = _.sortBy(homes, function (home) {
								return -parseInt(home.price);
							});
							break;
					}
					return homes;
				},
			};
		});
})();
