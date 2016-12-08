

(function(){

var app = angular.module("gitHubViewer", []);	

var MainController = function($scope, $http){

	var onUserComplete = function(response){
		$scope.user = response.data;
		$http.get($scope.user.repos_url)
		.then(onRepos, onError);
	};

	var onRepos = function(response){
		$scope.repos = response.data;
	};

	var onError = function(reason){
		$scope.error = "Could not fetch the data";
	};

	$scope.username="angular";   
	
	$scope.search = function(){
 		$http.get('https://api.github.com/users/' + $scope.username)
    	.then(onUserComplete, onError);
	};

	
 	
	$scope.message = "Github Viewer";
  	$scope.repoSortOrder = "-stargazers_count";
};
app.controller("MainController", MainController);
}());
