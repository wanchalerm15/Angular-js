angular.module('app')
// กำหนด Path ให้กับ location ที่จะไป
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        controller:"homeController",
        templateUrl:"document/home.html",
        title:"ทดสอบการ เพิ่มข้อมูล ลบข้อมูล แบบ Json"
    })
    .when('/delete/:product_id',{
        title:"ลบข้อมูลสินค้า",
        controller:"homeController",
        templateUrl:"document/home.html"
    })
    .when('/addProduct',{
        title:"เพิ่มสินค้า - Add Product",
        controller:"addController",
        templateUrl:"document/addProduct.html"
    })
    .when('/showProduct/:show_id',{
        title:"แสดงสินค้า",
        controller:"homeController",
        templateUrl:"document/showProduct.html"
    })
    .otherwise({
        redirectTo:'/'
    });
})
// กำหนอ Title ให้กับหัวเว็บไซด์
.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
}]);