var app = angular.module("store-app", []);

app.controller('StoreController', ['$scope','$http', function($scope, $http) {
    $http.get("/data").then(result => $scope.plates = result.data);

    $http.get("/cart").then(result => $scope.cartItems = result.data);

    $scope.addToCart = function(id) {
        $http.put("/cart/" + id).then(result => alert("Item added to your cart"));
    }

    $scope.removeFromCart = function(id) {
        $http.delete("/cart/" + id).then(result => {
            $http.get("/cart").then(result => $scope.cartItems = result.data);
            alert("Item removed from your cart");
        });
    }
}]);

