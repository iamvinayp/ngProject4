//var myApp = angular.module('eplApp', ['ngRoute']);

myApp.controller('matchStatisticsController',['$http', '$scope', function($http, $scope){

    $scope.getTeamDetails = function(){

    var baseUrl;

    if ($scope.season == "season16"){
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    $scope.matchday = 0;
    }
    else{
    baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    $scope.matchday = 0;
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
            $scope.teamNamesTemp = [];
            $scope.teamNames = [];
            // finding team names
            for (var i=0; i<$scope.allMatches.rounds.length; i++){
                for(var j=0; j<$scope.allMatches.rounds[i].matches.length; j++){
                    $scope.teamNamesTemp.push($scope.allMatches.rounds[i].matches[j].team1.name,$scope.allMatches.rounds[i].matches[j].team2.name);
                }
            }
            // removing duplicate team names
            $scope.teamNames = $scope.teamNamesTemp.filter(function(value, index, array){
                return (array.indexOf(value) == index);
            });

            //declaring array for fetching details of each team
            $scope.teamDetails = [];
            for(var i=0; i<$scope.teamNames.length; i++){
                $scope.teamDetails.push({
                    name   : $scope.teamNames[i],
                    played : 0,
                    goals  : 0,
                    won    : 0,
                    lost   : 0,
                    drawn  : 0
                });
            }

            //console.log($scope.teamDetails);

            // finding other details of teams
            for (var i=0; i<$scope.allMatches.rounds.length; i++){
                for(var j=0; j<$scope.allMatches.rounds[i].matches.length; j++){
                    if (!$scope.allMatches.rounds[i].matches[j].team1.score1 && !$scope.allMatches.rounds[i].matches[j].team2.score2) {
                        for(var k=0; k<$scope.teamDetails.length; k++){
                            if($scope.allMatches.rounds[i].matches[j].team1.name == $scope.teamDetails[k].name && $scope.allMatches.rounds[i].matches[j].score1 !==null){
                                $scope.teamDetails[k].played++;
                                $scope.teamDetails[k].goals = $scope.teamDetails[k].goals + $scope.allMatches.rounds[i].matches[j].score1;
                                if ($scope.allMatches.rounds[i].matches[j].score1 > $scope.allMatches.rounds[i].matches[j].score2){
                                    $scope.teamDetails[k].won++;
                                }
                                else if($scope.allMatches.rounds[i].matches[j].score1 < $scope.allMatches.rounds[i].matches[j].score2){
                                    $scope.teamDetails[k].lost++;
                                }
                                else if($scope.allMatches.rounds[i].matches[j].score1 !==null){
                                    $scope.teamDetails[k].drawn++;
                                }
                            }
                            else if($scope.allMatches.rounds[i].matches[j].team2.name == $scope.teamDetails[k].name && $scope.allMatches.rounds[i].matches[j].score2 !==null){
                                $scope.teamDetails[k].played++;
                                $scope.teamDetails[k].goals = $scope.teamDetails[k].goals + $scope.allMatches.rounds[i].matches[j].score2;
                                if ($scope.allMatches.rounds[i].matches[j].score2 > $scope.allMatches.rounds[i].matches[j].score1){
                                    $scope.teamDetails[k].won++;
                                }
                                else if($scope.allMatches.rounds[i].matches[j].score2 < $scope.allMatches.rounds[i].matches[j].score1){
                                    $scope.teamDetails[k].lost++;
                                }
                                else if($scope.allMatches.rounds[i].matches[j].score2 !==null){
                                    $scope.teamDetails[k].drawn++;
                                }
                            }
                        }
                    }
                }
            }
            console.log($scope.teamDetails);
            //console.log($scope.teamNames);
        }, function errorCallback(response){
           //called asynchronously if an error occurs
           //or server returns response with an error status.
           alert("Some error occurred. Check the console.");
           console.log(response);
        });
    }

    $scope.getTeamDetails();

    // variables used for sorting purposes
    $scope.sortColumn = 'won';
    $scope.reverseSort = true;

    $scope.sortInfo = function(column){
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    } // end sortInfo

    $scope.getSortArrow = function(column){
        if($scope.sortColumn == column){
            return $scope.reverseSort ? 'arrow-down': 'arrow-up';
        }
        return '';
    } // end getSortArrow

    }]);// end of 'matchStatisticsController'