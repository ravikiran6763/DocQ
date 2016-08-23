DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, doctoronoffdetails) {

console.log('patienthome ctrl');
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

				$ionicLoading.show({
							template: '<p>Loading All Specialities...</p><ion-spinner></ion-spinner>'
						});

						$timeout(function () {
							console.log('timeout');
						 $ionicLoading.hide();
					 }, 5000);

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
