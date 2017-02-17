//var myApp = angular.module('eplApp', ['ngRoute']);

myApp.controller('allMatchesController',['$http', '$location', '$anchorScroll', '$scope', function($http, $location, $anchorScroll, $scope){

    $scope.season = "season15";

    $scope.getAllMatches = function(){

    var baseUrl;

    if ($scope.season == "season16"){
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    $scope.matchday = 0;
    }
    else if($scope.season == "season15"){
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    $scope.matchday = 0;
        if ($scope.searchName == "Burnley" || $scope.searchName == "Hull City" || $scope.searchName == "Middlesbrough"){
            alert("Select 2016-17 as season");
        }
    }

    $scope.allMatches = {};

        $http({
            method : 'GET',
            url    : baseUrl
        }).then(function successCallback(response){
            //this callback will be called asynchronously
            //when the response is available
            //console.log(response);
            $scope.allMatches = response.data;
            console.log($scope.allMatches);
        }, function errorCallback(response){
           //called asynchronously if an error occurs
           //or server returns response with an error status.
           alert("Some error occurred. Check the console.");
           console.log(response);
        });
    }

    $scope.getAllMatches();

    $scope.getDayMatches = function(){

    var baseUrl;

    if ($scope.season == "season16")
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    else
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';

    $scope.allMatches = {};

        $http({
            method : 'GET',
            url    : baseUrl
        }).then(function successCallback(response){
            //this callback will be called asynchronously
            //when the response is available
            //console.log(response);
            $scope.allMatches = response.data;
            $scope.allMatches.rounds.splice($scope.matchday);
            //$scope.allMatches.rounds = $scope.allMatches.rounds[$scope.matchday-1];
            //console.log($scope.allMatches.rounds);
        }, function errorCallback(response){
           //called asynchronously if an error occurs
           //or server returns response with an error status.
           alert("Some error occurred. Check the console.");
           console.log(response);
        });
    }

    $scope.scrollTo = function(scrollArea) {
        $location.hash(scrollArea);
        $anchorScroll.yOffset = 70;
        $anchorScroll();
    }// end scrollTo

    }]);// end of 'allMatchesController'