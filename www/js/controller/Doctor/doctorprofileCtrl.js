DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $ionicPopup, $timeout, $rootScope, $localStorage, doctorServices) {


$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;

doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
  $scope.myConsultedDoctors=response;




  $scope.showConfirm = function() {
       var confirmPopup = $ionicPopup.confirm({
        //  title: '<h4>Thank You</h4>',
         template: '<b>Request for Video call has been sent <br><center>00:02</center></b>',
         cssClass: 'videoPopup',
         scope: $scope,
         buttons: [
          	{ text: 'Cancel',
              type: 'button-royal', },
          	{
          	text: 'Resend',
          	type: 'button-positive',

          	},
          ]
         //templateUrl: "views/app/viewdoctor_profile.html",
       });

     };

     $scope.BalanceCheck = function() {
          var confirmPopup = $ionicPopup.confirm({
           //  title: '<h4>Thank You</h4>',
            template: '<b>Your DoctorQuick Balance is too low.</b>',
            cssClass: 'videoPopup',
            scope: $scope,
            buttons: [
             	{ text: 'Cancel',
                 type: 'button-royal', },
             	{
             	text: 'Topup',
             	type: 'button-positive',

             	},
             ]
            //templateUrl: "views/app/viewdoctor_profile.html",
          });

        };


  }).catch(function(error){
console.log('failure data', error);
});

doctorServices.myDoctorsDetails($localStorage.DoctorPhone).then(function(response){
$scope.myDocDetails=response;
}).catch(function(error){
console.log('failure data', error);
});

})
