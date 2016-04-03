var app = angular.module('PersonalSiteApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('landing', {
			url: "/",
			template: "<landing-dir></landing-dir>"
		})
		.state('blog', {
			url: "/blog",
			template: "<blog-dir></blog-dir>"
		})
})