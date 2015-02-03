var app = angular.module('app',['ngRoute']);
/*------------------------------------------------------------------*/
app.factory('productService',function(){
    var products = [
        {"name":"Apple",
         "unit":5,
         "price":150,
         "image":"http://avilavalleyappletrail.com/uploads/3/4/2/6/3426513/117142_orig.jpg",
         "detail":"ผลไม้ แอ๊ปเปิ้ล จากไร้ตะวันจร้า สดๆแดงๆ"
        },
        {"name":"Mango",
         "unit":7,
         "price":200,
         "image":"http://library.stou.ac.th/blog/wp-content/uploads/2013/12/670702e85.jpg",
         "detail":"มะม่วงๆ พันธุ์เขียวเสวย มันๆหวานๆ จร้า "
        }
    ];
    var factory = {};
    factory.getProducts = function(){
        return products;
    }
    factory.setProducts = function(product){
        products.push(product);
    };
    factory.deleteProduct = function(product_id){
        products.splice(product_id,1);
    };
    return factory;
});
/*------------------------------------------------------------------*/
app.controller('homeController',function($scope,productService,$routeParams,$location){
    $scope.products ={},$scope.product={};
    $scope.products = productService.getProducts();
    $scope.showp=true;

    if($routeParams.product_id){
        productService.deleteProduct($routeParams.product_id);
        $location.path("/");
    }else if($routeParams.show_id){
        var product_id = $routeParams.show_id;
        $scope.show_product = $scope.products[product_id];
        document.title='แสดงสินค้า : '+$scope.show_product.name;
    }
    
    /*---------------------------------------------------------------------*/
    $scope.editProduct = function(index){
        add_product.index_id.value = index;
        add_product.name.value = $scope.products[index].name;
        add_product.unit.value = $scope.products[index].unit;
        add_product.price.value = $scope.products[index].price;
        add_product.image.value = $scope.products[index].image;
        add_product.detail.value = $scope.products[index].detail;
        $scope.showp=false;
    };
    $scope.edit_submitProduct = function(){
        var index_id = add_product.index_id.value,
            name = add_product.name.value,
            unit = add_product.unit.value,
            price = add_product.price.value,
            image = add_product.image.value,
            detail = add_product.detail.value;
        var up_Product = {
            name:name,
            unit:unit,
            price:price,
            image:image,
            detail:detail
        };
        $scope.products[index_id] = up_Product;
        $scope.showp=true;
    };
});

app.controller('addController',function($scope,productService,$location){
    $scope.addProduct = function(){
        productService.setProducts($scope.product);
        $scope.product={};
        $location.path('/');
    };
});
