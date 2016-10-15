
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $timeout, $stateParams, medicalSpecialityService,$localStorage, $ionicLoading) {

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

console.log($rootScope.specialId);

  medicalSpecialityService.getMedicalSpeciality($rootScope.specialId)
   .then(function(response){
      console.log('Details', response);
      $scope.specialityDetails = response;
      $state.go('app.specialityDetailsNew');
   }).catch(function(error){
       console.log('failure data', error);
   });

   $scope.sendrequesttoonlinedoctors = function()
   {
     $ionicLoading.show({
     content: 'Loading...',
     animation: 'fade-in',
     showBackdrop: false,
     maxWidth: 200,
     showDelay: 500,
   });
     console.log('buttonclicked');
     console.log($rootScope.specialId);

     medicalSpecialityService.sendrequesttodoctor($rootScope.specialId).then(function(response){
       console.log($rootScope.specialId);
       // console.log('successfull data', response);
         if(response)
         {

           $scope.requestSent = response;
           console.log('Request Sent');
           console.log($scope.requestSent);
           // $state.go('app.callAccepted');
           $ionicLoading.hide();
         }
         else {
           alert('error');
         }
      }).catch(function(error){
          console.log('failure data', error);
      });
   }


   function CheckOnlineDocs() {
     $localStorage.SpecilityId=$rootScope.specialId;
   medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
    .then(function(response){
      // console.log($localStorage.SpecilityId);
      // console.log('Details', response);
      $scope.specialityDetails = response;
    }).catch(function(error){
       console.log('failure data', error);
    });
   }

   $interval(CheckOnlineDocs, 5000);


});
