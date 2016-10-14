DoctorQuickApp.controller('searchDoctorsController', function($scope, $ionicConfig, $state,$rootScope, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, searchDoctorServices, searchbyspecialities) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	console.log('Search controller called');

	$scope.searchdoctorbydifferentscenario = function(specialitywise,catwise,genderwise,languagewise)
	{
			$scope.doclist = {};
				if(specialitywise == null && catwise == null && genderwise == null && languagewise == null)
				{
					alert('Please Select Atlease One Search Criteria');
				}
				else
				{
					/* Patients Selected One of the Search Criteria */
						var searchdoctor = {
							byspecial:specialitywise,
							bygender:catwise,
							bystatus:genderwise,
							bylanguage:languagewise
						};
						searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
							if(Object.keys(response).length)
							{
								$state.go('app.doctorsearch');
								$ionicLoading.show();
									 $scope.doclist = response;
									 console.log(response);
									 $ionicLoading.hide();
							}
							else if(Object.keys(response).length == 0)
							{
								console.log('empty');
								$ionicPopup.alert({
								title: 'Sorry',
								template:' no doctors are available right now!!'
								})
								return true;

							}
							else {
								$scope.doclist = response;
									console.log(response);
									$state.go('app.doctorsearch');

								$rootScope.doclist = "no doctors found";
							}
						}).catch(function (response, data, status, header) {
						});
				}
	}


})
