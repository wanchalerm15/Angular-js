angular.module('app',['ngRoute'])
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'webpage/main.html',
        controller:'homeController',
        title:'หน้าแรก - แสดงข้อมูล'
    })
    .when('/addData',{
        templateUrl:'webpage/add.html',
        controller:'homeController',
        title:'เพิ่มข้อมูลเว็บ Developer'
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
    this.haha = 10001;
    devData.setData = function(data){
        Data = data;
    };
    devData.getData = function(){
        return Data;
    };
    return devData;
})
.service('myService',function($http,devUrl){
    this.intro = "Hello World !";
    this.outro = "Good Bye !";
})
.controller('homeController',function($scope,develop,devData,myService){
    console.log(myService);
    
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
})
.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
}]);;