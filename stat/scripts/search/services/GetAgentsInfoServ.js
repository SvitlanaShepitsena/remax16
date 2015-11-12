(function () {
	'use strict';
	angular.module('search')
		.factory('GetAgentsInfoServ', function ($q, url, users, $firebaseObject, $firebaseArray) {
			var repo = url + 'homes/agents/';
			var agentsArr = $firebaseArray(new Firebase(repo));

			function all() {
				return $q(function (resolve, reject) {
					agentsArr.$loaded().then(function (results) {
						resolve(results);
					})
				}).catch(function (err) {
					console.log(err);
					reject(err);
				});
			}

			function getAgent(key, agents) {
				if (_.isObject(key)) {
					return key;
				}
				var agent = _.findWhere(agents, {$id: key});
				agent = _.omit(agent, function (prop, key) {
					return key[0] === '$';
				})
				return agent;
			}

			return {
				get: function (homes) {
					return $q(function (resolve, reject) {
						all().then(function (agents) {
							var agentsArr = _.toArray(agents);
							for (var i = 0; i < homes.length; i++) {
								var home = homes[i];
								home.agentObj = getAgent(home.agent, agentsArr);
							}
							resolve(homes);
						});
					});
				},
				getByEmail: function (email) {
					return $q(function (resolve, reject) {
						all().then(function (agents) {
							agents.forEach(function (agent) {
								if (agent.email && agent.email === email) {
									resolve(agent);
								}
							});
							resolve(null);
						});
					});
				},
				getByKey: function (key) {
					return $q(function (resolve, reject) {
						var agent=$firebaseObject(new Firebase(repo+key));
						agent.$loaded().then(function (agent) {
							resolve(agent);
						})
					});
				},
			};
		});
})();
