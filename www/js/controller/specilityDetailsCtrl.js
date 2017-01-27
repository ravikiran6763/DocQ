
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $stateParams,$ionicPopup ,$localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading) {

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

// TO CHECK NO OF DOCTORS ONLINE IN VSEE

  // var username = "greet+8792618138,ravikiran6763@gmail.com";
  // var password = "DQ_patient";
  //
  // var success = function(message)
  // {
  //   alert(message);
  // }
  //
  // var failure = function()
  // {
  //   alert("Error calling Hello Plugin");
  // }

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
     /*Send request to all available doctor*/
     medicalSpecialityService.sendrequesttodoctor($rootScope.special).then(function(response){
       console.log('successfull data', response);
      }).catch(function(error){
          console.log('failure data', error);
      });
      /*Start timers*/
        $scope.counter = 120;
        $scope.onTimeout = function(){
          $scope.counter--;
          mytimeout = $timeout($scope.onTimeout,1000);
          if($scope.counter == 0){
          console.log('one minute over');
          $scope.counter=120;
          $rootScope.buttonText='Send Request';
          $timeout.cancel(mytimeout);

          }
        }
     var mytimeout = $timeout($scope.onTimeout,1000);//timer interval
     $rootScope.buttonText='Request sent' ;
     $scope.callReqPopUp = $ionicPopup.show({
           template: "<div ng-app='refresh_div' >Your request for a<br>video call has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
           cssClass: 'requestPopup',
           scope: $scope,
           buttons: [
           {
           text: 'Cancel',
           type: 'button-royal',
           onTap:function(){
             console.log('cancel');
             console.log($scope.counter);
             console.log($localStorage.user);
             medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
             $scope.cancelledReq=response;
               $state.go($state.current, {}, {reload: true});
             }).catch(function(error){
             console.log('failure data', error);
             });
           }
           },

         ]
         });
         $timeout(function() {
           console.log('cancelCall here');
           medicalSpecialityService.cancelReq($localStorage.user).then(function(response){
           $scope.cancelledReq=response;
             console.log($scope.cancelledReq);
           }).catch(function(error){
           console.log('failure data', error);
           });
            $scope.callReqPopUp.close(); //close the popup after 3 seconds for some reason
            console.log('closing this');
         }, 180000);


   console.log($scope.counter);
   console.log('buttonclicked');
   }

   function CheckOnlineDocs(){
   $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      $scope.specialityDetails = response;
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

  //  $interval(CheckOnlineDocs, 5000);
  $interval(checkAcceptedReq,1000);
   function checkAcceptedReq(){
     console.log($scope.accptdReq);

     medicalSpecialityService.checkForAccptedReq($localStorage.user).then(function(response){
     $scope.accptdReq=response;
       if($scope.accptdReq != ''){


         var accptDoc=$scope.accptdReq;
         for(var i=0; i<accptDoc.length; i++){
           $rootScope.doctorPhone=accptDoc[i].doctorPhone,
           $rootScope.callId=accptDoc[i].callId,
           $rootScope.cal_flag=accptDoc[i].flag

         }

         $state.go('app.callAccepted',{accptdDoc:$rootScope.doctorPhone,callId:$rootScope.callId,callFlag:$rootScope.cal_flag});
         $scope.callReqPopUp.close();
         console.log('show accpted doc profile');


             // $state.go("app.patient_home")

       }

     }).catch(function(error){
     console.log('failure data', error);
     });

   }

});
