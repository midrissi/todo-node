(function(app) {
	'use strict';
	app.service('Task', function ($resource) {
		return $resource('/task/:id', {
			id:'@__KEY'
		}, {
			setAll: {
				method: 'POST',
				transformRequest: function (d) {
					return JSON.stringify([d === true]);
				},
				url: '/task/methods/setAll'
			},
			clearCompleted: {
				method: 'POST',
				transformRequest: function () {
					return '[]';
				},
				url: '/task/methods/clearCompleted'
			}
		});
	});
})(angular.module('a'));
