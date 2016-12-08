

(function(){

var app = angular.module("gitHubViewer", []);	

var MainController = function($scope, $http, $interval, $log){

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
		$log.info("searching for ..." + $scope.username);
 		$http.get('https://api.github.com/users/' + $scope.username)
    	.then(onUserComplete, onError);
    	if(countdownInterval){
    		$interval.cancel(countdownInterval);
    		$scope.countdown = null;
    	}
	};

	var descrementCountDown  = function(){
		$scope.countdown -=1;
		if($scope.countdown < 1){
			$scope.search($scope.username);
		}
	};

	$scope.setInterval
	var countdownInterval = null;
	var startCountdown = function(){
		countdownInterval = $interval(descrementCountDown, 1000,$scope.countdown);
	};
 	
	$scope.message = "Github Viewer";
  	$scope.repoSortOrder = "-stargazers_count";
  	$scope.countdown = 5;
  	startCountdown();
};
app.controller("MainController", MainController);
}());
