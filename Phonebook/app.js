var myApp = angular.module('App', []);

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

myApp.controller("myCtrl",function($scope, $http)
 {
   $http.get('phonebook.json').then(function(response){

      $scope.staffs = response.data;
    });
 });


