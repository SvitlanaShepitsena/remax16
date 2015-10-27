(function () {
	'use strict';
	angular.module('search')
		.directive('svAutoHide', function () {
			return {
				require: '?^mdAutocomplete',
				link: function ($scope, el, attrs, ctrl) {
					console.log(ctrl);
					//ctrl.clear();
					ctrl.hidden = true;
				}
			};
		});
})();
