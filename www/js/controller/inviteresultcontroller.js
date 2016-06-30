DoctorQuickApp.controller('inviteresultCtrl', function($scope,$stateParams,invitereviews,invitereviewsresultservice){


  $scope.count = $stateParams.countofselected;


  $scope.cc ={};

$scope.contacts = {};

<<<<<<< HEAD
$scope.cc.query = "Hi,  Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";

=======
$scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";
>>>>>>> 3b3ff4e4626d16d032aa8e5c88309f52d6f1e9a1

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
