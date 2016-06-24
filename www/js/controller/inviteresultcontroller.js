DoctorQuickApp.controller('inviteresultCtrl', function($scope,$stateParams,invitereviews,invitereviewsresultservice){


  $scope.count = $stateParams.countofselected;


  $scope.cc ={};

$scope.contacts = {};

<<<<<<< HEAD
$scope.cc.query = "Hi,Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";
=======
$scope.cc.query = "Hi,  Please visit my page at DoctorQuick and help me with a rating to promote my profile and boosting my access to many more patients. Many Thanks, Veeresh";
>>>>>>> 50495e1409f3abfe4b4eebc4f3b1c40ff88eef97


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
