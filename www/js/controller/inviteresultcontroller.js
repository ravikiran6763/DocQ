DoctorQuickApp.controller('inviteresultCtrl', function($scope,$stateParams,$localStorage,invitereviews,invitereviewsresultservice){


  $scope.count = $stateParams.countofselected;
  $scope.cc ={};
  $scope.contacts = {};

  $scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients.Many Thanks.";


$scope.Savedata = function()
{
  console.log($localStorage.user);
      $scope.contacts = invitereviews.getinvitecontacts();
      invitereviews.sendsmstoinvitereviews($scope.contacts,$scope.cc.query,$localStorage.user);
}


$scope.Cleardata = function()
{
  $scope.cc.query = "";
}



});
