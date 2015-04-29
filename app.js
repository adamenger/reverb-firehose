var app = angular.module("Firehose", []);
var polling_rate = 3000;

app.controller("ListingCtrl", function($scope, $http, $timeout) {
  var poll = function () {
    $timeout(function(){
      $http.get('https://reverb.com/api/listings.json').
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


