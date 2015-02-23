angular.module('app',["ngRoute"])
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        controller:"mainController",
        templateUrl:"webpage/Names.html"
    })
    .when('/addData',{
        controller:"mainController",
        templateUrl:"webpage/addData.html"
    })
    .otherwise({redirectTo:'/'});
})
.service('stu',function($http){
    this.studens = [];
    this.set_student = function(studen){
        this.studens.push(studen);
    };
})
.controller('mainController',function($scope,stu){
    $scope.studens = stu.studens;
    $scope.AddNames = function(){
        stu.set_student($scope.name);
        $scope.name = null;
        location = "#/";
    };
});