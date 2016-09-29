
DoctorQuickApp.controller('medicalSpecialityController', function($state, $rootScope, $scope, $interval, $timeout, medicalSpecialityService,$localStorage, $ionicLoading) {

    $rootScope.headerTxt="Medical Speciality";
    $rootScope.showBackBtn=true;
    $rootScope.checkedValue = false;
    $rootScope.showNotification=false;
    $rootScope.showBadge=false;


    $scope.sendrequesttoonlinedoctors = function(id)
    {

      $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 500,
    });
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
        if($scope.specialitiesList){
          $ionicLoading.show({
                template: '<p>Loading All Specialities...</p><ion-spinner></ion-spinner>'
              });

              $timeout(function () {
                console.log('timeout');
               $ionicLoading.hide();
             }, 5000);
        }


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


     function CheckOnlineDocs() {
     medicalSpecialityService.getMedicalSpeciality($localStorage.SpecilityId)
      .then(function(response){
        // console.log('Details', response);
        $scope.specialityDetails = response;
        // $state.go('app.specialityDetailsNew');
      }).catch(function(error){
         console.log('failure data', error);
      });
     }
     $interval(CheckOnlineDocs, 5000);


});
