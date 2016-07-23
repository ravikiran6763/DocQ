DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope, $ionicLoading, $ionicConfig, $ionicHistory, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, doctoronoffdetails) {


			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;

			$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
			});

			$scope.medicalSpeciality = function(){
$ionicLoading.show();
					medicalSpecialityService.getMedicalSpecialist()
					.then(function(response){
						console.log('appctrl called');
							console.log('successfull data', response);
							$scope.specialitiesList = response;

					 }).catch(function(error){
							 console.log('failure data', error);
					 });

				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}
})
