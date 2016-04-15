angular.module("serviceApp", ["ionic"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'app/home/home.html'
  });

  $urlRouterProvider.otherwise('/home');
})

.factory('bluetooth', function($q) {
    return {
        getDevices: function() {
          var deferred = $q.defer();
          bluetoothSerial.list(function(devices) {
              deferred.resolve(devices);
            }, function() {
              deferred.reject('Failed to find discover devices.');
            });
          return deferred.promise;
        },
        isEnabled: function() {
          bluetoothSerial.isEnabled(function () {
            alert("Bluetooth is Enabled.");
          }, function (reason) {
            alert("Bluetooth is *not* Enabled.");
            }
          );
        }
    };
});
