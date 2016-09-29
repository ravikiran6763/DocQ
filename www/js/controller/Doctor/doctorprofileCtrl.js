DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $interval, $rootScope, $cordovaNetwork, $localStorage, $ionicLoading, doctorServices) {

$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;
$rootScope.docPhone = $localStorage.docPhone;

console.log($rootScope.docPhone);
console.log('docprofileview');

$ionicLoading.show();

// $interval(checkDocStatus, 6000);

// $interval(checkConnection, 6000);

doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
$scope.myDocDetails1=response;
console.log('doc',$scope.myDocDetails1);

}).catch(function(error){
console.log('failure data', error);
});

function checkDocStatus() {

  doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
  $scope.myDocDetails1=response;
  console.log('doc',$scope.myDocDetails1);

  }).catch(function(error){
  console.log('failure data', error);
  });

}
console.log(window.connection);

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
      $localStorage.patientWalletBalance=$scope.myBalance;
          console.log('pop up page clicked');
          	var uname = "greet+"+$localStorage.user;
             var pw = "DQ_patient";

             //var persontocall = "greet+" + $localStorage.docPhone;


             var persontocall = "greet+" + $localStorage.consultedDoctor;


             console.log(uname);
             console.log(persontocall);

             var success = function(message)
              {
                  alert(message);
              }
              var failure = function()
              {
                alert("Error calling Hello Plugin");
              }


        if($scope.myBalance >= 250)
        {

          hello.greet(uname,pw,persontocall,success, failure);


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
$scope.BalanceForVoiceCall=function()
{



  $ionicLoading.show();
  doctorServices.checkMyBalance($localStorage.user).then(function(response){
    // console.log(response[0][0]);
    $scope.myBalance=response[0][0];


    var uname = "greet+"+$localStorage.user;
     var pw = "DQ_patient";

     //var persontocall = "greet+" + $localStorage.docPhone;

     var persontocall = "greet+" + $localStorage.consultedDoctor;


     console.log(uname);
     console.log(persontocall);

     var success = function(message)
      {
          alert(message);
      }
      var failure = function()
      {
        alert("Error calling Hello Plugin");
      }



    if($scope.myBalance >= 250)
    {

          hello.audiocallvsee(uname,pw,persontocall,success, failure);


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

    doctorServices.myDoctorsDetails($localStorage.consultedDoctor).then(function(response){
    $scope.myDocDetails=response;
    }).catch(function(error){
    console.log('failure data', error);
    });



})
