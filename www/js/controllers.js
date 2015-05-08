angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope, $firebaseArray) {

	var ref = new Firebase("https://shining-inferno-7335.firebaseio.com/products");
	$scope.products = $firebaseArray(ref);
	//$scope.products = [{'name':'Iphone', 'prices': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}, {'name':'Samsung', 'prices': 78.10, 'img': 'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}] 
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('DashDetailCtrl', function($scope, $stateParams) {

	$scope.product = {}; 
	$scope.product.id = $stateParams.productId;

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SignInCtrl', function($scope) {

})

.controller('SignUpCtrl', function($scope) {

})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
