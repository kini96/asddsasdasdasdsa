var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
	// $locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
<<<<<<< HEAD
			templateUrl: '/partial/main/home',
=======
			templateUrl: '/partial/home',
>>>>>>> 3a604b978fb67c84e7eaa0b59bff361eebac3146
			controller: 'MainCtrl'
		})
});