var app = angular.module("Firehose", []);
// rate which we poll the reverb api in milliseconds
var polling_rate = 5000;
// how many listings per page we will pull, 50 is max
var per_page = 50;

app.controller("ListingCtrl", function($scope, $http, $timeout) {
  var poll = function () {
    $timeout(function(){
      $http.get('https://reverb.com/api/listings.json?per_page=' + per_page).
        success(function(data, status, headers, config) {
          $scope.listings = data['listings'];
        }).
        error(function(data, status, headers, config) {
          // log error
        });
      poll();
    }, polling_rate);
  };
  poll();
});
