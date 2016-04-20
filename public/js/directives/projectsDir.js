var app = angular.module('PersonalSiteApp');
app.directive("projectsDir", function() {
	return {
		restrict: "E",
		templateUrl: "templates/projectsDir.html"
	}
})