var app = angular.module('PersonalSiteApp');

app.directive("blogDir", function($location) {
	return {
		restrict: "E",
		templateUrl: "templates/blogDir.html",
		controller: function() {
			this.readMore = function(post) {
				console.log(post);
				//$location.path('/listing/' + post._id);	
				window.location.href = '#/blog/listing/' + post._id;
			}
		}, 
		controllerAs: "blogCtrl"
	}
})