var app = angular.module('PersonalSiteApp');

app.directive('landingDir', function() {
	return {
		restrict: "E",
		templateUrl: "templates/landingDir.html",
		controller: function($http, $state) {
			this.contacting = false;
			this.name = "";
			this.email = "";
			this.message = "";
			this.sendEmail = function() {
					if(!this.name || !this.email || !this.message) {
						alert("please fill all the information!");
					} else {
						//
						console.log("here");
						console.log({
							name: this.name,
							email: this.email,
							message: this.message
						})
						console.log($http)
						$http.post("/admin/email", {
							name: this.name,
							email: this.email,
							message: this.message
						})
						.then(function(success) {
							alert("thank you");
							$state.go("landing", {}, {reload:true});
						}, function(error) {
							alert("Woops, that's lame... Something didn't work.");

						})
					}
				}
		},
		controllerAs: "landingCtrl"
	}
})