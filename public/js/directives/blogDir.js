var app = angular.module('PersonalSiteApp');

app.directive("blogDir", function() {
	return {
		restrict: "E",
		templateUrl: "templates/blogDir.html",
		controller: function() {

		}, 
		controllerAs: "blogCtrl"
	}
})