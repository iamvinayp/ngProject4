//var myApp = angular.module('eplApp', ['ngRoute']);
// custom filter for filtering two columns on single input control
myApp.filter('bothTeamNames', function(){
    return function(dataArray, search){
        if(angular.isDefined(search)){
            var results = [];
            var i;
            var searchVal = search.toLowerCase();
            // iterating through matches array & checking if searched name
            // is there as a substring/string in name of either team1/team2 obj
            for(i=0; i<dataArray.length; i++){
                var team_1_Name = dataArray[i].team1.name.toLowerCase();
                var team_2_Name = dataArray[i].team2.name.toLowerCase();
                if(team_1_Name.indexOf(searchVal) >=0 || team_2_Name.indexOf(searchVal) >=0){
                    results.push(dataArray[i]);
                }
            }
            return results;
        }
        else{
            return dataArray;
        }
    };
});