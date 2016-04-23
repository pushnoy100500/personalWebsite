var app = angular.module('PersonalSiteApp');
app.directive('adminDir', function($localStorage, authService, $http, postingService) {
	return {
		restrict: "E",
		templateUrl: "templates/adminDir.html",
		controller: function($state) {
			if(!$localStorage.loggedIn) {
				$state.go("login")
			}
			this.newTitle = "";
			this.newAuthor = "";
			this.newTags = "";
			this.newMessage = "";

			this.addPost = function() {
				if(confirm("Create post?")) {
					postingService.addPost({
						title: this.newTitle,
						author: this.newAuthor,
						tags: this.newTags,
						message: this.newMessage
					}, 
					function(result) {
						console.log(result);
						// append to the dom
						$state.go("admin", {}, {reload: true});
					})
				}
			}

			this.editing = '';
			this.setEditing = function(index) {
				this.editing = index;
			}
			this.disableEditing = function() {
				this.editing = "";
			}
			this.deletePost = function(id) {
				var sure = confirm("are you sure?");
				if(sure) {
					postingService.deletePost(id, function() {
						$state.go("admin", {}, {reload: true});
					})
				}
			}
			this.updatePost = function(post) {
				postingService.updatePost(post, function() {
					$state.go("admin", {}, {reload: true});
				})
			}
			this.logout = function() {
				$http.post("/admin/logout", {
					user: $localStorage.user
				}).then(function(success) {
					authService.logout();
					$state.go("landing");
				}, function(error) {
					console.log(error)
				})
			}
		},
		controllerAs: "adminCtrl"
	}
})