DoctorQuickApp.controller('inviteresultCtrl', function($scope,$state,$stateParams,$localStorage,$ionicLoading,invitereviews,invitereviewsresultservice){


  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  $scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";


$scope.Savedata = function()
{
  $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br><br>Sending invite'
      });
  console.log($localStorage.user);
      $scope.contacts = invitereviews.getinvitecontacts();
      invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.cc.query,$localStorage.user).then(function(response){
        if(response){
          $ionicLoading.hide();
          $scope.contacts='';
          $state.go("templates.doctor_home")
        }
      }).catch(function(error){
      console.log('failure data', error);
      })
}


$scope.Cleardata = function()
{
  $scope.cc.query = "";
}



});
