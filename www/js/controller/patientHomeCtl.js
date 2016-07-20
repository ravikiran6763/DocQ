DoctorQuickApp.controller('patientHomeCtrl', function($scope,$state,$rootScope, $ionicConfig, $ionicHistory, $ionicPlatform, $ionicPopup,$localStorage,doctoronoffdetails) {


			$rootScope.headerTxt="DoctorQuick";
			$rootScope.showBackBtn=false;
			$rootScope.showDocStatus=false;
			$rootScope.showNotification=true;
			$rootScope.showBadge=true;
			
			$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
			});
})
