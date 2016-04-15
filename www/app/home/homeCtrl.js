angular.module('serviceApp').controller('homeCtrl', function($scope, $ionicModal, $ionicLoading, $q, bluetooth) {

  $ionicModal.fromTemplateUrl('app/home/modals/blueToothDeviceScan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
    $ionicLoading.show({
      template: 'Scanning...'
    });
    bluetooth.getDevices().then(function(devices) {
      $scope.stopLoading();
      $scope.devices = devices;
    }, function(msg){
      $scope.stopLoading();
      alert(msg);
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.stopLoading = function() {
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
