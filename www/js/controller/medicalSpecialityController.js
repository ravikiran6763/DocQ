
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;


    $scope.sendrequesttoonlinedoctors = function(id)
    {
      $ionicLoading.show();
    //   $ionicLoading.show({
    //   content: 'Loading...',
    //   animation: 'fade-in',
    //   showBackdrop: false,
    //   maxWidth: 200,
    //   showDelay: 500,
    // });
      console.log('buttonclicked');

      medicalSpecialityService.sendrequesttodoctor(id).then(function(response){

          // console.log('successfull data', response);

          if(response)
          {
            $scope.requestSent = response;
            // $state.go('app.callAccepted');
            alert('Request Sent');
            $ionicLoading.hide();
          }
          else {
            alert('error');
          }
       }).catch(function(error){
           console.log('failure data', error);
       });
    }

    medicalSpecialityService.getMedicalSpecialist().then(function(response){
        console.log('successfull data', response);
        $scope.specialitiesList = response;
        $ionicLoading.hide();
     }).catch(function(error){
         console.log('failure data', error);
     });

     medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
 		 .then(function(response){
 				console.log('Details', response);
 				$scope.specialityDetails = response;
        $ionicLoading.hide();
 		 }).catch(function(error){
 				 console.log('failure data', error);
 		 });



});
