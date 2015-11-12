(function () {
	'use strict';
	angular.module('search')
		.directive('svAutoComplete', function () {
			return {
				require: '?^ngModel',
				link: function ($scope, el, attrs, ctrl) {
				}
			};
		});
})();
