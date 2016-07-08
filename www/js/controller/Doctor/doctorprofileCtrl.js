DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $rootScope, $localStorage, $ionicLoading, doctorServices) {

$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;
// console.log(docPhone);

$rootScope.docPhone = $stateParams.docPhone;
console.log($rootScope.docPhone);

$ionicLoading.show();
doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    $ionicLoading.hide();
  }).catch(function(error){
console.log('failure data', error);
});

    $scope.checkWalletBalance=function()
    {
      $ionicLoading.show();
      doctorServices.checkMyBalance($localStorage.user).then(function(response){
        // console.log(response[0][0]);
        $scope.myBalance=response[0][0];
        if($scope.myBalance >= 250)
        {

          var confirmPopup = $ionicPopup.confirm({
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


        }
        else
        {

          var confirmPopup = $ionicPopup.confirm({
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
                 	$state.go('app.patient_topup');
               }

             	},
             ]
            //templateUrl: "views/app/viewdoctor_profile.html",
          });

        }
          $ionicLoading.hide();
        }).catch(function(error){
      console.log('failure data', error);
      });

    }
//for voice call
$scope.BalanceForVoiveCall=function()
{
  $ionicLoading.show();
  doctorServices.checkMyBalance($localStorage.user).then(function(response){
    // console.log(response[0][0]);
    $scope.myBalance=response[0][0];
    if($scope.myBalance >= 250)
    {

      var confirmPopup = $ionicPopup.confirm({
        template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
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


    }
    else
    {

      var confirmPopup = $ionicPopup.confirm({
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

              $state.go('app.patient_topup');

           }

          },
         ]
        //templateUrl: "views/app/viewdoctor_profile.html",
      });

    }
      $ionicLoading.hide();
    }).catch(function(error){
  console.log('failure data', error);
  });

}

    doctorServices.myDoctorsDetails($localStorage.DoctorPhone).then(function(response){
    $scope.myDocDetails=response;
    }).catch(function(error){
    console.log('failure data', error);
    });



})
