var app = angular.module('PersonalSiteApp');
app.directive("postDetailsDir", function() {
	return {
		restrict: "E",
		templateUrl: "templates/postDetailsDir.html"
	}
})