angular.module('app',[])
.service('productData',function(){
    var index = 103;
    this.products = [];
    this.saveProduct = function(product){
        if(product.index === undefined){
            product.id = index++;
            this.products.push(product);
        }else{
            this.products[product.index] = product;
        }
    };
    this.getProduct = function(index){
        return this.products[index];
    };
    this.removeProduct = function(index){
        this.products.splice(index,1);
    };
})
.controller('productController',function($scope,productData){
    $scope.products = productData.products;
    //    -------------------------------------
    $scope.saveProductS = function(){
        productData.saveProduct($scope.new_product);
        $scope.new_product = {};
    };
    $scope.editProduct = function(index){
        $scope.new_product = angular.copy(productData.getProduct(index));
        $scope.new_product.index = index;
    };
    $scope.deleteProduct = function(index){
        if(confirm('Are You Delete This Product !')){
            productData.removeProduct(index);
        }
    };
});