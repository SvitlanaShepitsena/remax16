(function () {
	'use strict';
	angular.module('article')
		.directive('svImageSearch', function (ImageSearchServ, $rootScope) {
			return {
				replace: true,
				templateUrl: 'scripts/article/directives/sv-image-search.html',
				scope: {
					insertImage: '&'
				},
				link: function ($scope, el, attrs) {
					var prepopulatedQuery = '';
					if ($rootScope.summary) {
						prepopulatedQuery = $rootScope.summary.replace(/&#34;/g, '"');
					}
					else {
						if ($rootScope.title) {
							prepopulatedQuery = $rootScope.title.replace(/&#34;/g, '"');
						}
					}
					$scope.q = {data: prepopulatedQuery};
					$scope.runGoogleSearch = function (query) {
						if (!query) {
							return;
						}
						if (query.indexOf('http')>-1) {
							$scope.images=[];
							$scope.images.push({url:query});

							return;
						}

						var queryArr = query.split(' ');
						ImageSearchServ.fetch(query).then(function (results) {
							var dataArray = _.pluck(results, 'data');
							var response = _.map(dataArray, function (resp) {
								return resp.responseData.results;
							});
							var finalImages = [];
							response.forEach(function (oneArr) {
								finalImages = _.union(finalImages, oneArr);
							});
							var images = _.map(finalImages, function (oneImgData) {
								return oneImgData.url
							});
							var gr = _.groupBy(images, function (i) {
								return i;
							});
							var sorted = _.sortBy(gr, function (oneGroup) {
								return -oneGroup.length;
							});
							var imagesSorted = _.take(sorted, 10);
							$scope.images= _.map(imagesSorted, function (img) {
								return {url:img[0]};
							});
							var breakPoint = 1;
						})
					};
				}
			};
		});
})();
