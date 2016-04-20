angular.module('serviceApp').controller('homeCtrl', function($scope, $ionicModal, $ionicLoading, $q, bluetooth) {

  $ionicModal.fromTemplateUrl('app/home/modals/blueToothDeviceScan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.connectBluetoothDevice = function(device) {
    console.log('connecting... ' + device.address);
    bluetooth.connect(device.address).then(function(data){
        bluetooth.write(data).then(function(result){
            console.log(result);
          },
          function(data) {
            console.log(result);
          });;
      },
      function(data) {
        console.log(data)
      });
  };

  $scope.openModal = function() {
    $scope.modal.show();
    // $scope.loading = $ionicLoading.show({
    //   template: 'Scanning...'
    // });

    bluetooth.getDevices().then(function(devices) {
      $scope.devices = devices;
      // $ionicLoading.hide();
    }, function(msg){
      // $scope.loading.hide();
      alert(msg);
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.stopLoading = function() {
    console.log('stop loading');
    $ionicLoading.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
