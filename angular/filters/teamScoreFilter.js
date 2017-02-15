//var myApp = angular.module('eplApp', ['ngRoute']);
// custom filter for filtering two columns on single input control
myApp.filter('bothTeamScores', function(){
    return function(dataArray, search){
        if(!search){
            return dataArray;
        }
        else{
            var results = [];
            var i;
            var searchVal = search;
            // iterating through matches array & checking if searched score
            // is equal to score1/score2 of that particular match
            for(i=0; i<dataArray.length; i++){
                var team_1_Score = dataArray[i].score1;
                var team_2_Score = dataArray[i].score2;
                if(team_1_Score == searchVal || team_2_Score == searchVal){
                    results.push(dataArray[i]);
                }
           }
           return results;
        }
    };
});