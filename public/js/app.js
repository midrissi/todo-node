(function(window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var app = angular
		.module('a', [
			'ngRoute',
			'ngResource'
		]);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/:type', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

	app.controller('MainCtrl', function($scope, $location, $routeParams, Task) {
		$scope.tasks = [];
		$scope.current = $routeParams.type;
		$scope.task = '';
		$scope.all_done = false;

		($scope.refresh = function() {
			var res;
			switch ($routeParams.type) {
				case 'active':
					res = Task.query({
						query: 'done == null or done == false'
					});
					break;
				case 'completed':
					res = Task.query({
						query: 'done == true'
					});
					break;
				case undefined:
					res = Task.query();
					break;
				default:
					$location.path('/');
					return;
			}

			res.$promise.then(function() {
				$scope.tasks = res;
			});
		})();

		$scope.add = function() {
			if ($scope.task) {
				var t = new Task({
					name: $scope.task
				});
				$scope.task = '';
				t.$save().then(function() {
					if ($routeParams.type) {
						$location.path('/');
					} else {
						$scope.refresh();
					}
				});
			}
		};

		$scope.remove = function(t, index) {
			if (t && confirm('Would like to remove this task?')) {
				t.$remove().then(function() {
					$scope.tasks.splice(index, 1);
				});
			}
		};

		$scope.toggle = function(t) {
			if (t) {
				t.done = !t.done;
				t.$save().then(function() {
					if ($routeParams.type) {
						$scope.refresh();
					}
				});
			}
		};

		$scope.setAll = function() {
			if ($scope.tasks && $scope.tasks.length) {
				Task.setAll($scope.all_done === true).$promise.then(function() {
					$scope.refresh();
				});
			}
		};

		$scope.clear = function() {
			if (confirm('Whould you like to clear completed tasks?')) {
				Task.clearCompleted().$promise.then(function() {
					$scope.refresh();
				});
			}
		};
	});
})(window);
