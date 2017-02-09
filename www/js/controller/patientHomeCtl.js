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

	  $scope.unreadchatforpatient = {};

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
<<<<<<< HEAD
		//  	hello.unreadchatfromusers(username,password,success, failure);
=======

	 	//hello.unreadchatfromusers(username,password,success, failure);

>>>>>>> 389412bc3de2aedc43bd2012704e035f90d6cf9d
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
