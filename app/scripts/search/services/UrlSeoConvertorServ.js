(function () {
	'use strict';
	angular.module('search')
		.factory('UrlSeoConvertorServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
			return {
				parse: function (query) {
					var path = '';
					var v;
					for (var p in query) {
						v = query[p];
						if (_.isArray(v)) {
							v = v.join('-');
						}
						if (p == 'saleRent') {
							if (v === 'sale') {
								path += '/homes-for-sale';
							} else {
								path += '/homes-for-rent';
							}
							continue;
						}
						if (v && v.toLowerCase() !== "any") {
							v = v.replace(/\s{2,}/g, ' ').trim();
							p = _.snakeCase(p);
							p = p.replace('_', '-');
							v = v.replace(/-/g, '~');
							v = v.replace(/\s+/g, '-');
							v = v.replace('/', '&');
							if (v.length) {
								path += '/' + p + '/';
								path += v;
							}
						}
					}
					return path.toLowerCase().slice(1);
				},
			};
		});
})();
