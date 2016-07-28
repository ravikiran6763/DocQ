DoctorQuickApp.controller('searchDoctorsController', function($scope, $ionicConfig,$state,$rootScope,$ionicSideMenuDelegate,searchDoctorServices,searchbyspecialities) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	console.log('controller called');


	//
	// $rootScope.specialityList = {};
	//
	// $scope.showSideMenu = function (selectedSearch){
	//
	// 		if (selectedSearch == "gender")
	// 		{
	// 				$rootScope.specialityList = [
	// 					{'special': 'Male'},
	// 					{'special': 'Female'}
	// 				]
	//
	// 	};
	// 	if (selectedSearch == "language") {
	//
	// 		$rootScope.specialityList = [
	// 					{'special': 'English'},
	// 					{'special': 'Kannada'},
	// 					{'special': 'Hindi'},
	// 					{'special': 'Tamil'},
	// 					{'special': 'Telugu'}
	// 		]
	//
	// 	};
	//
	// 	if (selectedSearch == "onlineOffline") {
	//
	// 		$rootScope.specialityList = [
	//
	// 				{'special': 'Online'},
	// 				{'special': 'Offline'}
	// 		]
	//
	// 	};
	// 	//Make API request and get the data
	// 	if (selectedSearch == "speciality")
	// 	{
	//
	// 				searchDoctorServices.specialitySearch().then(function(response){
	// 				$rootScope.specialityList=response;
	//
	//
	// 		}).catch(function(error){
	// 			console.log('failure data', error);
	// 		});
	//
	// 	};
	//
	// 	$rootScope.sideMenuForSearch = true;
	// 	$ionicSideMenuDelegate.toggleRight();
	// }
	//
	//
	// $scope.sidemenu = {};
	//
	//
	// $scope.h1 = function(val)	{
	//
	//
	// 		if(val === "Asthma Specialist " || val === "Ayurvedic Doctor " || val === "Cardiologist" || val === "Dentist " || val == "Dermatologist" || val === "Dietician/Nutritionist" || val === "Ear-nose-throat specialist" || val === "Gastroenterologist" || val === "General Physician " || val === "Gynecologist" || val === "Homeopathy" || val === "Lactation Consultant " || val === "Neurologist" || val === "Obstetrician/Gynecologist " || val === "Orthopaedic Surgeon" || val === "Pediatrician" || val === "Psychiatrist" || val === "Veterinarian")
	// 		{
	//
	// 			$scope.specfic = val;
	//
	// 		}
	//
	// 		if(val == "Female" || val == "Male")
	// 		{
	//
	// 				if(val === "Male")
	// 				{
	//
	// 					$scope.gender = "M";
	//
	//
	// 				}
	// 				else
	// 				{
	//
	// 					$scope.gender = "F";
	//
	// 				}
	//
	//
	// 		}
	//
	// 	if(val == "Offline" || val == "Online")
	// 	{
	//
	// 		if(val === "Online")
	// 		{
	//
	// 				$scope.onoff = 1;
	//
	// 		}
	// 		else
	// 		{
	//
	// 				$scope.onoff = 2;
	//
	// 		}
	//
	//
	// 	}
	//
	// 	if(val == "Kannada" ||  val == "English" || val == "Hindi" ||  val == "Telugu" || val == "Tamil")
	// 	{
	//
	// 		$scope.languagedata = val;
	//
	// 	}
	//
	//
	// 		 searchbyspecialities.specialitywisesearch($scope.specfic);
	// 		 searchbyspecialities.categorywisesearch($scope.gender);
	// 		 searchbyspecialities.genderwisesearch($scope.onoff);
	// 		 searchbyspecialities.languagewisesearch($scope.languagedata);
	//
	// 		$scope.specialdata =  searchbyspecialities.getSpecialData();
	// 			$scope.genderdata =  searchbyspecialities.getcategoryData();
	// 				$scope.statusdata =  searchbyspecialities.getgenderData();
	// 					$scope.languagedataselected =  searchbyspecialities.getlanguageData();
	//
	//
	//
	//
	// }
	//
	// 	$scope.searchdoctorbydifferentscenario = function(specialitywise,catwise,genderwise,languagewise)
	// 	{
	//
	// 			$rootScope.doclist = {};
	//
	// 				if(specialitywise == null && catwise == null && genderwise == null && languagewise == null)
	// 				{
	//
	// 					alert('Please Select Atlease One Search Criteria');
	//
	// 				}
	// 				else
	// 				{
	// 					/* Patients Selected One of the Search Criteria */
	//
	// 						var searchdoctor = {
	//
	// 							byspecial:specialitywise,
	// 							bygender:catwise,
	// 							bystatus:genderwise,
	// 							bylanguage:languagewise
	//
	// 						};
	//
	//
	//
	// 						$rootScope.stmt = "";
	//
	// 						searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
	//
	// 							if(Object.keys(response).length)
	// 							{
	// 								$state.go('templates.doctorsearch');
	//
	// 									 $rootScope.doclist = response;
	//
	//
	//
	// 							}
	// 							else {
	// 									//$state.go('templates.doctorsearch');
	//
	// 									console.log(response);
	// 								$rootScope.doclist = "no doctors found";
	// 							}
	//
	//
	//
	// 						}).catch(function (response, data, status, header) {
	//
	// 						});
	//
	//
	//
	// 				}
	//
	// 	}


})
