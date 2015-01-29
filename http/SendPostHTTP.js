angular.module('process', ['ngRoute'])
.controller('angController', function ($scope, $http) {
    $scope.name = {};
    $scope.addName = function () {
        $scope.name.addData = 1;
        angular_ajaxPost($http, 'server.php', serialize($scope.name)).success(function (data) {
            console.log(data);
        });
    };
})
.config(function ($routeProvider) {
    $routeProvider.when(
        '/home', {
            controller: "angController",
            templateUrl: 'home.html'
        })
    .otherwise({redirectTo: '/home'});
});
function angular_ajaxPost(http, url, data) {
    return http({
        url: url,
        method: "POST",
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
}
function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}