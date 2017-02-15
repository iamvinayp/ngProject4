//var myApp = angular.module('eplApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home',{
            // location of the template
        	templateUrl		: 'views/home-view.html',
        	// Which controller it should use
        })
        .when('/fixture',{
            templateUrl     : 'views/allMatches-view.html',
            controller      : 'allMatchesController'
        })
        .when('/singlematch/:round/:match',{
            templateUrl     : 'views/singleMatch-view.html',
            controller      : 'singleMatchController'
        })
        .when('/statistics',{
            templateUrl     : 'views/matchStatistics-view.html',
            controller      : 'matchStatisticsController'
        })
        .otherwise(
            {
                redirectTo:'/home'
                //template   : '<h1>404 page not found</h1>'
            });
}]);