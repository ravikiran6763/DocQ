
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;



    $scope.sendrequesttoonlinedoctors = function(id)
    {


        medicalSpecialityService.sendrequesttodoctor(id);



    }




    $ionicLoading.show(
      {
        content: '',
        // template:'Fetching Specialities..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 100,
        showDelay: 0
      }
    );
    medicalSpecialityService.getMedicalSpecialist()
    .then(function(response){
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
