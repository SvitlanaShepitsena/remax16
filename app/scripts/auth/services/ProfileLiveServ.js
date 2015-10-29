(function () {
	'use strict';
	angular.module('auth')
		.factory('ProfileLiveServ', function ($q, url, users, $firebaseObject, GetAgentsInfoServ, ProfileExtentionServ, $firebaseArray, userAuth) {
			var ref = new Firebase(users);
			var unwatch;
			var userPublicProps = [
				'avatar',
				'email',
				'userName',
				'role',
				'brokerId',
				'brokerPic'
			];

			function pickUserProps(user) {
				return _.pick(user, userPublicProps);
			}

			return {
				setBinding: function (userKey) {
					return $q(function (resolve, reject) {
						var profile = $firebaseObject(ref.child(userKey).child('profile'));
						profile.$loaded(function () {
							/*bound when profile is loaded*/
							function resolveProfile() {
								userAuth.profile = ProfileExtentionServ.extend(profile);
								userAuth.key = userKey;
								unwatch = profile.$watch(function (data) {
									//console.log('changes');
									/*bound on watch and update profile on any changes*/
									userAuth.profile = ProfileExtentionServ.extend(profile);
									//console.log(userAuth.profile);
								});
								resolve(true);
							}

							if (profile.role == 'broker') {
								GetAgentsInfoServ.getByEmail(profile.email).then(function (broker) {
									if (broker) {
										profile.brokerId = broker.$id;
										profile.brokerPic = broker.pic;
									}
									resolveProfile();
								})
							} else {
								resolveProfile();
							}
						})
					});
				},
				unbind: function () {
					unwatch();
					userAuth.profile = null;
					userAuth.key = null;
				}
			};
		});
})();
