DoctorQuickApp.controller('searchDoctorsController', function($scope, $ionicConfig, $state,$rootScope, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, searchDoctorServices, searchbyspecialities,doctorServices,rateDoctorServices) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	console.log('Search controller called');

	$scope.viewDoc2=function(docPhone){
		console.log(docPhone);
	doctorServices.myDoctorsDetails(docPhone).then(function(response){
				$scope.myDocDetail=response;
				console.log(response);
				$state.go('app.results');
			}).catch(function(error){
			console.log('failure data', error);
			});

		

		}

})
