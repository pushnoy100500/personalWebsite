var app = angular.module('PersonalSiteApp');
app.directive("adminLoginDir", function(authService, $http, $state) {
	return {
		restrict: "E",
		templateUrl: "templates/adminLoginDir.html",
		controller: function() {
			this.admin = "";
			this.password = "";
			this.tryLogin = function() {
				$http.post("/admin/login", 
							{
								user: this.admin,
								password: this.password
							})
							.then(function(success) {
								if(success.data.access) {
									authService.login(success.data.user, success.data.token);
									$state.go("admin");
								} else {
									alert("wrong credentials");
								}
								
							},

							function(error) {
								console.log(error);
						    });
			}
		},
		controllerAs: "loginCtrl"
	}
})