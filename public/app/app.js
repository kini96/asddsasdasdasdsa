var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl: '/partial/home',
			controller: 'MainCtrl'
		})
});

app.controller('MainCtrl', function($scope){
	$scope.message = 'Hi from angular!';
});