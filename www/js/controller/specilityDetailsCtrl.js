
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;

	$rootScope.specialId = $stateParams.specialId;
  $rootScope.special = $stateParams.special;
  $rootScope.content1 = $stateParams.content1;
  $rootScope.descrpt = $stateParams.descrpt;
  console.log($rootScope.descrpt);

$rootScope.specialId = $stateParams.specialId;

  //var username = "greet+"+$localStorage.user;

  var username = "greet+8792618138,ravikiran6763@gmail.com";
  var password = "DQ_patient";

  var success = function(message)
  {
    alert(message);
  }

  var failure = function()
  {
    alert("Error calling Hello Plugin");
  }

  // hello.logininformation(username,password,success, failure);



console.log($rootScope.specialId);

  medicalSpecialityService.getMedicalSpeciality($rootScope.specialId)
   .then(function(response){
      console.log('Details', response);
      $scope.specialityDetails = response;
      $state.go('app.specialityDetailsNew');
   }).catch(function(error){
       console.log('failure data', error);
   });

   $scope.counter = 0;
   $scope.stopped = false;
   $scope.buttonText='Send Request';



   $scope.sendrequesttoonlinedoctors = function()
   {
     //////////
     $scope.buttonText='Request sent' ;
     $scope.counter = 300;
     $scope.onTimeout = function(){
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout,1000);
        if($scope.counter == 0){
          console.log('one minute over');
          $scope.counter=300;
          $scope.buttonText='Send Request';
          $timeout.cancel(mytimeout);

        }
     }
     var mytimeout = $timeout($scope.onTimeout,1000);
     $scope.confirmPopup = $ionicPopup.show({
           template: "Your request for a<br>video call has been sent.<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b>",
           cssClass: 'requestPopup',
           scope: $scope,
           buttons: [
           {
           text: 'Cancel',
           type: 'button-royal',
           onTap:function(){
             console.log('cancel');
             console.log($scope.counter);

           }
           },

         ]
         });

         //close popup automatically
        //  $timeout(function() {
   		 //     $scope.confirmPopup.close(); //close the popup after 3 seconds for some reason
   		 //  }, 60000);

          //////

   ///////////
   console.log('timer started');
   console.log($scope.counter);

       console.log('buttonclicked');
       medicalSpecialityService.sendrequesttodoctor($rootScope.specialId).then(function(response){
         console.log('successfull data', response);

        }).catch(function(error){
            console.log('failure data', error);
        });

   }

   function CheckOnlineDocs() {
   $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      $scope.specialityDetails = response;
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

  //  $interval(CheckOnlineDocs, 5000);


});
