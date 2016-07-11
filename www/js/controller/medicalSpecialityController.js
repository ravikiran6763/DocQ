
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;

    $scope.sendrequesttoonlinedoctors = function(id)
    {
      console.log('buttonclicked');
      $ionicLoading.show();
      medicalSpecialityService.sendrequesttodoctor(id).then(function(response){
          // console.log('successfull data', response);

          if(response)
          {

            $scope.requestSent = response;
            console.log($scope.requestSent);
            $ionicLoading.hide();

            alert('Request Sent')


          }
          else {

            alert('error');

          }


       }).catch(function(error){
           console.log('failure data', error);
       });;

    }

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
