DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope,$interval, $ionicLoading, $ionicConfig, $ionicHistory, 	$timeout, $ionicPlatform, $ionicPopup,$localStorage,medicalSpecialityService, doctoronoffdetails) {

			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;

			$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
			});


			$scope.currentState=$ionicHistory.currentStateName();

			console.log($scope.currentState);

$interval(checkNewMessages,2000);

function checkNewMessages(){
	if($scope.currentState == 'app.patient_home')
	{

			var username = "greet+"+$localStorage.user;
			var password = "DQ_patient";

					console.log(username);
				var success = function(message)
				{
						$rootScope.unreadchatforpatient = message;
				}
				var failure = function()
				{
				 alert("Error calling unreadchatcount Plugin");
				 //console.log('error');
				}
		// hello.unreadchatfromusers(username,password,success, failure);
	}
}

			$rootScope.unreadchatforpatient = {};
			if($scope.currentState == 'app.patient_home')
			{

					var username = "greet+"+$localStorage.user;

							var password = "DQ_patient";

							console.log(username);


						var success = function(message)
						{
								$rootScope.unreadchatforpatient = message;

						}

						var failure = function()
						{
						 alert("Error calling unreadchatcount Plugin");
						 //console.log('error');

						}

				// hello.unreadchatfromusers(username,password,success, failure);
			}

			$ionicPlatform.registerBackButtonAction(function(e){

				$scope.currentState=$ionicHistory.currentStateName();


				if($scope.currentState === 'templates.doctor_home' || $scope.currentState ==='app.patient_home'){
					// $ionicHistory.clearHistory();
					$ionicHistory.removeBackView();

					console.log('this is called');


				}
					else if ($ionicHistory.backView()) {
					$ionicHistory.goBack();
					console.log('back');
					}
					else {
						$ionicHistory.goBack();

					// $rootScope.backButtonPressedOnceToExit = true;
					// window.plugins.toast.showShortCenter(
					// "Press back button again to exit",function(a){},function(b){}
					// );
					// setTimeout(function(){
					// $rootScope.backButtonPressedOnceToExit = false;
					// },2000);
					}

			},101);






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


			$scope.searchDoctors=function()
			{
				console.log('searc clkd');
					$state.go('app.searchDoctors');
			}
})
