(function () {
	'use strict';
	angular.module('ad.promotion')
		.directive('svS3Upload', function (Upload, $timeout, ImgBase64Serv,userAuth,$rootScope) {
			return {
				templateUrl: 'scripts/ad/promotion/directives/sv-s3-upload.html',
				link: function ($scope, el, attrs) {
					$scope.upload = function (dataUrl) {
						if (dataUrl) {
							ImgBase64Serv.postUrl('/broker-thumb', dataUrl,userAuth.profile.brokerId).then(function () {;
								$scope.broker.pic='https://s3.amazonaws.com/remax16/'+userAuth.profile.brokerId+'.jpg';
								$scope.saveProfileModal($scope.broker.pic);
								$scope.hide();
							});
						}
					};
					$scope.$watch('files', function () {
						$scope.upload($scope.files);
					});
				}
			};
		});
})();
