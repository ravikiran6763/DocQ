DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, HardwareBackButtonManager,doctoronoffdetails) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;

			HardwareBackButtonManager.disable();

			$scope.currentState=$ionicHistory.currentStateName();

			console.log($scope.currentState);

$interval(checkNewMessages,2000);

function checkNewMessages(){

	if($scope.currentState == 'app.patient_home')
	{

	  $scope.unreadchatforpatient = 0;

			var username = "greet+"+$localStorage.user;
			var password = "DQ_patient";

					// console.log(username);
				var success = function(message)
				{
						$scope.unreadchatforpatient = message;
				}
				var failure = function()
				{
				 //alert("Error calling unreadchatcount Plugin");
				 console.log('error');
				}
		hello.unreadchatfromusers(username,password,success, failure);

	}


}
$timeout(function () {
	console.log('timeout');
 $ionicLoading.hide();
}, 5000);

			$scope.medicalSpeciality = function(){
				$state.go('app.medical_speciality');
				$ionicLoading.hide();
			}


			$scope.searchDoctors=function()
			{
				console.log('searc clkd');
					$state.go('app.searchDoctors');
			}
})
