var app = angular.module("myApp", []);

app.controller('ShopController',function($scope, $http, $rootScope) {
		$scope.cartItems = [];

            var url = "json.json";
            $http.get(url).success( function(response) {
               $scope.items = response;
			});
$rootScope.totalquantity = 0;
$rootScope.totalprice = 0;
$scope.qty= 1;

 $scope.disp = function (totalquantity) {
        if ($scope.totalquantity == 0)
            return 0;
        else
            return $rootScope.totalprice + 10 + ((6 / 100) * $rootScope.totalprice);
    }


$scope.hiddenbtn=[];

$scope.AddInCart = function (qty, price,name,index) {

	$rootScope.totalquantity += qty * 1;
        $rootScope.totalprice += (qty * price);
        if ($rootScope.totalquantity == 1)
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-item' + ')'; } //displaying the number of items
        else
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-items' + ')'; } //displaying the number of items

        $scope.itemvalue = $rootScope.totalprice;

        // alert('inside statement');
        $scope.hiddenbtn(index);

		var jsonCartItem = {};
        jsonCartItem.n = name;
        jsonCartItem.q = qty;
        jsonCartItem.p = price;
        jsonCartItem.t = qty * price;

        $scope.cartItems.push(jsonCartItem);

};

$scope.hiddenbtn = function (index) {

        //alert("inside sub function      " + index +"------------"+ $scope.hiddenbtn[index]);
        if (angular.isUndefined($scope.hiddenbtn[index])) {
            $scope.hiddenbtn[index] = true;
        }
        else if (angular.equals($scope.hiddenbtn[index], false)) {
            $scope.hiddenbtn[index] = true;
            //$scope.items[i].itemval[index] = 1;
            //$scope.itemval[index] = 1;
        }
        else if (angular.equals($scope.hiddenbtn[index], true)) {
            $scope.hiddenbtn[index] = false;
        }
        else {
            $scope.hiddenbtn[index] = false;
        }
        //  alert("outside sub function      " + index + "------------" + $scope.hiddenbtn[index]);
    };



 $scope.removeCartItem = function(qty,price,name,Newindex){
	$rootScope.totalquantity -= qty * 1;
        $rootScope.totalprice -= (qty * price);
        if ($rootScope.totalquantity == 1)
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-item' + ')'; } //displaying the number of items
        else
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-items' + ')'; } //displaying the number of items

        $scope.itemvalue = $rootScope.totalprice;

        var index = -1;
        for (var i in $scope.cartItems) {

            if ($scope.cartItems[i].n == name) {
                index = i;

            }
        }
        console.log(index)
        $scope.cartItems.splice(index, 1);

        $scope.hiddenbtn(Newindex);
 }

$scope.removeCart = function (qty, price, Newname) {
        $rootScope.totalquantity -= qty * 1;
        $rootScope.totalprice -= (qty * price);
        if ($rootScope.totalquantity == 1)
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-item' + ')'; } //displaying the number of items
        else
        { $scope.itemdisplay = '(' + $rootScope.totalquantity + '-items' + ')'; } //displaying the number of items
        $scope.itemvalue = $rootScope.totalprice;

		var index = -1;
        for (var i in $scope.items) {

            //alert($scope.items[i].name );
            if (angular.equals($scope.items[i].name, Newname)) {
                //alert($scope.items[i].name + " name of the product" + Newname)
                index = i;
                $scope.hiddenbtnFromCart(i,index);
            }
        }

        for (var i in $scope.cartItems) {
            if ($scope.cartItems[i].n == Newname) {
                index = i;
				$scope.cartItems.splice(index, 1);

            }

        }


    }
 $scope.hiddenbtnFromCart = function (i,index) {
        // alert("inside sub function      " + index + "------------" + $scope.hiddenbtn[index]);
        $scope.hiddenbtn[index] = false;
        //$scope.qty = 1;
        //      alert($scope.qty);

    };

$scope.minus=function(qty,price,iname){
		qty=qty-1;
		$scope.cartItems.q=qty;
}
  });

