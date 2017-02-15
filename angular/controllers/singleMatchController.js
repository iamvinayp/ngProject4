//var myApp = angular.module('eplApp', ['ngRoute']);

myApp.controller('singleMatchController',['$http', '$routeParams', '$scope', function($http, $routeParams, $scope){

    $scope.match = JSON.parse($routeParams.match);
    $scope.round = $routeParams.round;
    //console.log($scope.match);

    if($scope.match.score1 > $scope.match.score2){
        $scope.winner = $scope.match.team1.name;
    }
    else if($scope.match.score1 <  $scope.match.score2){
        $scope.winner = $scope.match.team2.name;
    }
    else if($scope.match.score1 == null || $scope.match.score2 == null){
        $scope.drawn = true;
        $scope.winner = "Match yet to be played";
    }
    else{
        $scope.winner = "Match drawn";
        $scope.drawn = true;
    }

    }]);// end of 'singleMatchController'