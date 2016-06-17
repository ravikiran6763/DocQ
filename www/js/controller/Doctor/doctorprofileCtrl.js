DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $ionicPopup, $timeout, $rootScope, $localStorage, doctorServices) {


$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;

doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
  $scope.myConsultedDoctors=response;

  $scope.showConfirm = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: '<h4>Thank You</h4>',
         template: 'Request for Video call has been sent <br><center>00:02</center>.'
         //templateUrl: "views/app/viewdoctor_profile.html",
       });

     };
     

  }).catch(function(error){
console.log('failure data', error);
});



})
