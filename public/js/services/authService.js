var app = angular.module('PersonalSiteApp');
app.service("authService", function($localStorage) {

	this.login = function(user, token) {
		$localStorage.loggedIn = true;
		$localStorage.user = user;
		$localStorage.token = token;
	
	}
	this.logout = function() {
		$localStorage.$reset();
	}
})