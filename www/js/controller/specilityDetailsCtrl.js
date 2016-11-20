
DoctorQuickApp.controller('specilityDetailsCtrl', function($state, $rootScope, $scope, $interval, $localStorage, $timeout, $stateParams, $cordovaToast, medicalSpecialityService,$localStorage, $ionicLoading) {

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
     if($localStorage.reqSent===1){
       console.log('already sent');
       $cordovaToast.showLongCenter('Request already Sent.', 'short', 'center').then(function(success) {
       // success

       }, function (error) {
       // error
       });
     }
     else{
       $ionicLoading.show();
       console.log('buttonclicked');
       medicalSpecialityService.sendrequesttodoctor($rootScope.specialId).then(function(response){
         console.log('successfull data', response);
           if(response)
           {
             $scope.requestSent = response;
             $localStorage.reqSent=1;
             console.log($localStorage.reqSent);
             $cordovaToast.showLongCenter('Request Sent.', 'short', 'center').then(function(success) {
             // success

             }, function (error) {
             // error
             });
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

   $interval(CheckOnlineDocs, 5000);


});
