DoctorQuickApp.controller('inviteresultCtrl', function($scope,$stateParams,invitereviews,invitereviewsresultservice){


  $scope.count = $stateParams.countofselected;


  $scope.cc ={};

$scope.contacts = {};



$scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";

$scope.cc.query = "Hi,  Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";

$scope.Savedata = function()
{

      $scope.contacts = invitereviews.getinvitecontacts();

      invitereviewsresultservice.sendsmstoinvitereviews($scope.contacts,$scope.cc.query);


}


$scope.Cleardata = function()
{

  $scope.cc.query = "";



}



});
