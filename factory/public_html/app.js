angular.module('app',['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'webpage/main.html',
        controller:'homeController'
    })
    .when('/addData',{
        templateUrl:'webpage/add.html',
        controller:'homeController'
    })
    .otherwise({
        redirectTo:"/"
    });
})
.value('devUrl','webpage/webpage.json')
.factory('develop',function($http,devUrl){
    var develop = {};
    develop.developView = function(){
        return $http.get(devUrl);
    };
    return develop;
})
.factory('devData',function(){
    var devData = {};
    var Data = [];
    devData.setData = function(data){
        Data = data;
    };
    devData.getData = function(){
        return Data;
    };
    return devData;
})
.controller('homeController',function($scope,develop,devData){
    if(devData.getData().length === 0){
        develop.developView().success(function(res){
            $scope.develop = res;
        });
    }else{
        $scope.develop = devData.getData();
    }
    /*---------------------------------------------*/
    $scope.dev={};
    $scope.addData = function(){
        $scope.develop.push($scope.dev);
        devData.setData($scope.develop);
        $scope.dev={};
    };
    /*-----------------------------------------------*/
    $scope.editData = function(){
    
    };
});