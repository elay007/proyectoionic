angular.module('starter.controllers', ['ionic','firebase','ngCordova','ionic.service.core'])

.controller('DashCtrl', function($scope, $firebaseArray) {

	//$scope.ref = new Firebase("https://shining-inferno-7335.firebaseio.com/products");
  $scope.ref = new Firebase("https://qrfact.firebaseio.com/facturas");
	$scope.facturas = $firebaseArray($scope.ref);

   $scope.addItems = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

  $scope.doRefresh = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    //$scope.$broadcast('scroll.infiniteScrollComplete')
  }
//Eliminar una factura
  $scope.doDelete = function() {
    alert("Fa"+$scope.factura.nro_fac+" Ummm");
    /*
    var facturaRef = new Firebase("https://qrfact.firebaseio.com/facturas/"+idFactura);
    
    var onComplete = function(error) {
      if (error) {
        console.log('Synchronization failed');
      } else {
        console.log('Synchronization succeeded');
      }
    };
    facturaRef.remove(onComplete);
    /*
    var nroFac = $factura.nro_fac;
    console.log(nroFac);
    alert("Factura Nro. " + nroFac + " ha sido eliminada.");
    //$scope.facturas.remove($factura)
    $factura.remove();
    $state.go('tab.dash');
    /*
      var facturaRef =  $rootScope.refirebase.child("facturas").push($scope.factura);
      var facturaId = facturaRef.key();
      console.log(facturaId);
      
      */
  }

	//$scope.products = [{'name':'Iphone', 'prices': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}, {'name':'Samsung', 'prices': 78.10, 'img': 'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}] 
})

.controller('DashFormCtrl', function($scope, $firebaseArray, $rootScope, $state, $cordovaCamera, $cordovaGeolocation, $cordovaBarcodeScanner) {

    $scope.factura = {"codigo_control" : "",
    "dato10" : "",
    "dato11" : "",
    "dato9" : "",
    "descuento" : "",
    "fecha_fac" : "",
    "importe" : "",
    "importe_ley" : "",
    "nit_cliente" : "",
    "nit_empresa" : "",
    "nro_aut" : "",
    "nro_fac" : ""};

/* dmancilla
      var myLatlng = new google.maps.LatLng(-17.37, -66.15);

      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);


      var marker = new google.maps.Marker({
              position: new google.maps.LatLng(-17.37, -66.15),
              map: map,
              title: "Mi locacion",
              options: { draggable: true }
      });
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      console.log(position);
      $scope.product.lat  = position.coords.latitude
      $scope.product.long = position.coords.longitude

      map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          
      marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    }, function(err) {
        console.log(err);
    });


    var watchOptions = {
      frequency : 1000,
      timeout : 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        console.log(err);
      },
      function(position) {
        console.log(position);
        $scope.product.lat  = position.coords.latitude;
        $scope.product.long = position.coords.longitude;

        marker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

    });

    google.maps.event.addListener(marker, 'dragend', function() {
        $scope.$apply(function(){
          //Stop listening changes
          watch.clearWatch();
          var pos = marker.getPosition();
          console.log(pos);
          $scope.product.lat  = pos.A;
          $scope.product.long = pos.F;
        });
    });


    //document.addEventListener("deviceready", function () {

    $scope.takePicture = function() {
          var options = {
              quality : 75,
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType : Camera.PictureSourceType.CAMERA,
              allowEdit : true,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
              targetWidth: 500,
              targetHeight: 500,
              saveToPhotoAlbum: false
          };
          $cordovaCamera.getPicture(options).then(function(imageData) {
              //syncArray.$add({image: imageData}).then(function() {
              //    alert("Image has been uploaded");
              //});
              console.log(imageData);
              $scope.product.photo = imageData;

          }, function(error) {
              console.error(error);
          });
      }
    //}, false);
*/
    $scope.uploadProduct = function() {
      var facturaRef =  $rootScope.refirebase.child("facturas").push($scope.factura);
      var facturaId = facturaRef.key();
      console.log(facturaId);
      $state.go('tab.dash-detail',{facturaId: facturaId});
    }

    $scope.leerCodigo = function() {
        //Test
        //$scope.loadCodeScan('1023149021|1277|3904001209025|08/01/2015|328.30|328.30|BB-F0-DD-8F-EE|5193654|0|0|0|140.70');
        $cordovaBarcodeScanner.scan().then( 
        function(imagenEscaneada) {
          $scope.loadCodeScan(imagenEscaneada.text);
      }, 
      function(error){
          alert('Ha ocurrido un error '+error);
        });
    }

    $scope.loadCodeScan = function(code) {
      alert('Codigo escaneado: ' + code);
      //REcuperamos todos los
      var datosCode = code.split('|');
      
      $scope.factura = {
        "nit_empresa" : datosCode[0],
        "nro_fac" : datosCode[1],
        "nro_aut" : datosCode[2],
        "fecha_fac" : datosCode[3],
        "importe" : datosCode[4],
        "importe_ley" : datosCode[5],
        "codigo_control" : datosCode[6],
        "nit_cliente" : datosCode[7],
        "dato9" : "",
        "dato10" : "",
        "dato11" : "",
        "descuento" : datosCode[11]
      };

    }


})
.controller('ChatsCtrl', function($scope, Chats, $rootScope, $state, $ionicHistory) {

  if (!$rootScope.userSignedIn()){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
  	$state.go('sign-in');
  }
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('DashDetailCtrl', function($scope, $stateParams, $firebaseObject) {

	//var ref = new Firebase("https://shining-inferno-7335.firebaseio.com/products/"+$stateParams.productId);
  var ref = new Firebase("https://qrfact.firebaseio.com/facturas/"+$stateParams.facturaId);


	$scope.factura = $firebaseObject(ref);

  $scope.factura.$loaded().then(function() {
    $scope.loadMap();
  });

	console.log($scope.factura);


  $scope.loadMap = function(){

    console.log("Factura");
    console.log($scope.factura);

    console.log($scope.factura.lat);
    console.log($scope.factura.long);

    var myLatlng = new google.maps.LatLng($scope.factura.lat, $scope.factura.long);

    console.log(myLatlng);

    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map1"), mapOptions);

    var marker = new google.maps.Marker({
            position: new google.maps.LatLng($scope.factura.lat, $scope.factura.long),
            map: map,
            title: $scope.factura.name
    });
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SignInCtrl', ['$scope', '$rootScope', '$window', '$localstorage' , '$ionicUser', 
  function ($scope, $rootScope, $window, $localstorage, $ionicUser) {
     // check session
     //$rootScope.checkSession();
     $scope.user = {
        email: "",
        password: ""
     };


     $scope.validateUser = function () {
        $rootScope.show('Please wait.. Authenticating');
        var email = this.user.email;
        var password = this.user.password;
        if (!email || !password) {
           $rootScope.notify("Please enter valid credentials");
           return false;
        }
        function authHandler(error, authData) {
          if (error) {
                $rootScope.hide();
                if (error.code == 'INVALID_EMAIL') {
                  $rootScope.notify('Invalid Email Address');
                }
                else if (error.code == 'INVALID_PASSWORD') {
                  $rootScope.notify('Invalid Password');
                }
                else if (error.code == 'INVALID_USER') {
                  $rootScope.notify('Invalid User');
                }
                else {
                  $rootScope.notify('Oops something went wrong. Please try again later');
                }
              }
            else {
              $rootScope.hide();
              console.log(authData);
              $rootScope.token = authData.token;
              $localstorage.set('token', authData.token);
              //console.log($localstorage.get('token', authData.token));
              //console.log($window.localStorage);

              $ionicUser.identify({
                user_id: authData.uid,
                email: email              
              }).then(function() {
                console.log("Success identify User");
              }, function(err) {
                  console.log("Error identify User");
                  console.log(err);
              });;
              $window.location.href = ('#/tabs/dash');
          }
        }
        $rootScope.refirebase.authWithPassword({
          email    : email,
          password : password
        }, authHandler);
     }
  }
])

 .controller('SignUpCtrl', [
    '$scope', '$rootScope',  '$window',
    function ($scope, $rootScope, $window) {
      
      $scope.user = {
        email: "",
        password: ""
      };

      $scope.createUser = function () {
 
		//var ref = new Firebase("https://shining-inferno-7335.firebaseio.com");
    //dmancilla
    var ref = new Firebase("https://qrfact.firebaseio.com/");


        if (!$scope.user.email || !$scope.user.password) {
          $rootScope.notify("Please enter valid credentials");
          return false;
        }
 
        $rootScope.show('Please wait.. Registering');

        $rootScope.refirebase.createUser($scope.user, function (error, user) {
          if (!error) {
          	console.log(user);
            $rootScope.hide();
            $rootScope.refirebase.child("users").child(user.uid).set({
              provider: 'password',
              email: $scope.user.email
            });
            //$rootScope.token = user.token;
            $window.location.href = ('#/');
          }
          else {
            $rootScope.hide();
            if (error.code == 'INVALID_EMAIL') {
              $rootScope.notify('Invalid Email Address');
            }
            else if (error.code == 'EMAIL_TAKEN') {
              $rootScope.notify('Email Address already taken');
            }
            else {
              $rootScope.notify('Oops something went wrong. Please try again later');
            }
          }
        });
      }
    }
  ])


.controller('AccountCtrl', function($scope, $rootScope, $state) {
  if (!$rootScope.userSignedIn()){
  	$state.go('sign-in');
  }
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MapCtrl', function($scope, $rootScope, $state) {


})

.controller('DownFileCtrl', function($scope, $firebaseArray) {// $ionicPlatform, $cordovaFile, $firebaseArray) {
  
    $scope.ref = new Firebase("https://qrfact.firebaseio.com/facturas");
    $scope.facturas = $firebaseArray($scope.ref);
    
  $scope.downFacturas = function() {
    alert('DownfileCtrl');

    $scope.ref = new Firebase("https://qrfact.firebaseio.com/facturas");
    $scope.facturas = $firebaseArray($scope.ref);
  /*CArgar un archivo, no funciona todavia
        document.addEventListener('deviceready', function () {
        $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
              .then(function (success) {
                alert('Archivo creado exitosamente');
              }, function (error) {
                alert('Error ' + error);
              });

        });
  */
  }
    
})


