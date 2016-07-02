DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $ionicPopup, $timeout, $rootScope, $localStorage, doctorServices) {


$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;

doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
  $scope.myConsultedDoctors=response;
  }).catch(function(error){
console.log('failure data', error);
});

    $scope.checkWalletBalance=function(){

      doctorServices.checkMyBalance($localStorage.user).then(function(response){
        // console.log(response[0][0]);
        $scope.myBalance=response[0][0];
        if($scope.myBalance >= 250){
          console.log('if part');
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
          console.log($scope.myBalance);

        }
        else {
          var confirmPopup = $ionicPopup.confirm({
           //  title: '<h4>Thank You</h4>',
            template: '<b>Your DoctorQuick Balance is too low.</b>',
            cssClass: 'videoPopup',
            scope: $scope,
            buttons: [
             	{
                text: 'Cancel',
                type: 'button-royal', },
             	{
             	text: 'Topup',
             	type: 'button-positive',
               onTap: function(e) {
                 console.log('topupclicked');
                 	$state.go('app.patient_topup');
               }

             	},
             ]
            //templateUrl: "views/app/viewdoctor_profile.html",
          });
          console.log('else part');
        }
        }).catch(function(error){
      console.log('failure data', error);
      });

    }

    $scope.showConfirm = function() {

       };

     $scope.BalanceCheck = function() {


        };

doctorServices.myDoctorsDetails($localStorage.DoctorPhone).then(function(response){
$scope.myDocDetails=response;
}).catch(function(error){
console.log('failure data', error);
});

})
