// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ionic.service.core'])

.run(function($ionicPlatform, $ionicLoading, $rootScope, $ionicLoading, $window, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


    $rootScope.token = null;


    //$rootScope.refirebase = new Firebase("https://qrfact.firebaseio.com");
    //dmancilla
    $rootScope.refirebase = new Firebase("https://qrfact.firebaseio.com/");

    //var authRef = new Firebase($rootScope.baseUrl);
    //$rootScope.auth = $firebaseAuth(authRef);
 
    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };
 

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };
 
    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 1999);
    };
 
    $rootScope.logout = function() {
      $rootScope.refirebase.unauth();
      $rootScope.checkSession();
    };

    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.authHandler = function(error, authData) {
      console.log(authData);
      if (error) {
        $rootScope.token = null;
      }
      else {
          $rootScope.token = authData.token;
          $localstorage.set('token', authData.token);
      }
    }
    $rootScope.initSession = function(){
      var token = 'lalyl0LdF1yjJA3wPvyhS1qyY2xMiQyp7srpPazR';//$localstorage.get('token');
      //var token = '';//$localstorage.get('token');
      console.log(token);

      if(token){
        $rootScope.refirebase.authWithCustomToken(token, $rootScope.authHandler);
      }
    }
    //$rootScope.initSession();


    $rootScope.userSignedIn = function(){
        return($rootScope.token != null)
    }

    $rootScope.checkSession = function() {
      //var authData = $rootScope.refirebase.getAuth();
      //if (authData) {
      if(!$rootScope.token){
        $state.go('sign-in');
        //$window.location.href = '#/';
        //console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } 
      //else {
        //$ionicHistory.nextViewOptions({
        //  disableAnimate: true,
        //  disableBack: true
        //});
        //$state.go('sign-in');
      //}
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  

  $ionicAppProvider.identify({
    // The App ID for the server
    //app_id: 'f3d4679b',
    app_id: '2aa77f14',
    // The API key all services will use for this app
    api_key: '3ca3d8f90bd464abead0e977a033b643df27482a00072523',
    
    api_write_key: 'f1caa1c892c2b4a4de4f50b8e0a1c89cfbe45794811310f8'
    // Your GCM sender ID/project number (Uncomment if using GCM)
    //gcm_id: 'AIzaSyCODrrFudpGT5p99ocdr5DUwA7pkga1pnU'
    //AIzaSyCODrrFudpGT5p99ocdr5DUwA7pkga1pnU
  });


  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.dash-detail', {
    url: '/dash/:facturaId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-detail.html',
        controller: 'DashDetailCtrl'
      }
    }
  })

  .state('tab.dash-form', {
    url: '/dash-form',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-form.html',
        controller: 'DashFormCtrl'
      }
    }
  })

  .state('sign-in', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInCtrl'
  })

  .state('tab.sign-up', {
    url: '/sign-up',
    views: {
      'tab-account': {
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  .state('tab.downfile', {
    url: '/downfile',
    views: {
      'tab-downfile': {
        templateUrl: 'templates/tab-downfile.html',
        controller: 'DownFileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
