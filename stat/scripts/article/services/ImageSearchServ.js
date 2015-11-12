(function () {
	'use strict';
	angular.module('article')
		.factory('ImageSearchServ', function ($q, $http, url, users, $firebaseObject, $firebaseArray) {
			var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&callback=JSON_CALLBACK&tbs=sur:f";
			var minLen = 3;
			var minWordsQuery = 4;

			function processQuery(query) {
				query = query.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '');
				var arrQuery = _.filter(query.split(' '), function (stem) {
					return stem.length > minLen;
				});
				var finalQueries = [];
				var highLimit = arrQuery.length - minWordsQuery;
				if (highLimit <= 0) {
					return [arrQuery.join(' ')];
				}
				for (var i = 0; i < arrQuery.length - minWordsQuery; i++) {
					var newQuery = arrQuery[i];
					for (var j = 1; j < minWordsQuery; j++) {
						var queryPart = arrQuery[i + j];
						newQuery += ' ' + queryPart;
					}
					finalQueries.push(newQuery)
				}
				return finalQueries;
			}

			return {
				fetch: function (query) {
					var stemmedQueries = processQuery(query);
					var promises = stemmedQueries.map(function (stemmedQuery) {
						var queryWithRequest = url + '&q=' + encodeURI(stemmedQuery);
						return $http.jsonp(queryWithRequest);
					});
					return $q.all(promises);
				}
			};
		});
})();
