(function () {
	'use strict';
	angular.module('common')
		.factory('ImgBase64Serv', function ($q, $http, url, users, $firebaseObject, $firebaseArray) {
			return {
				imgUrlToBlob: function (dataURI) {
					// doesn't handle URLEncoded DataURIs
					var byteString;
					if (dataURI.split(',')[0].indexOf('base64') >= 0)
						byteString = atob(dataURI.split(',')[1]);
					else
						byteString = unescape(dataURI.split(',')[1]);
					// separate out the mime component
					var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
					// write the bytes of the string to an ArrayBuffer
					var ab = new ArrayBuffer(byteString.length);
					var ia = new Uint8Array(ab);
					for (var i = 0; i < byteString.length; i++) {
						ia[i] = byteString.charCodeAt(i);
					}
					// write the ArrayBuffer to a blob, and you're done
					return new Blob([ab], {type: mimeString});
				},
				postUrl: function (url, img64,filename) {
					return $q((resolve, reject)=> {
						var blob = this.imgUrlToBlob(img64);
						var fd = new FormData();
						fd.append(filename, blob, filename+'.jpg');
						$http.post(url, fd, {
							headers: {'Content-Type': undefined},
							transformRequest: angular.identity
						}).success(function () {
							resolve();
						}).error(function (errc) {
						})
					});
				}
			};
		});
})();
