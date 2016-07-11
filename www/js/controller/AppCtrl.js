DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope, $window, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, LoginService, patientProfileDetailsService, searchDoctorServices, doctorServices, medicalSpecialityService, myConsultationService, rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices) {

	$rootScope.headerTxt='';
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.doclist = {};
	$scope.myDocDetail = {};

	$scope.ratings = [{
 				current: $scope.myDoctorRatings,
 				max: 5
 		}, ];

	$scope.searchDoctors=function()
	{
			$state.go('app.searchDoctors');
	}

		$rootScope.goBack = function ()
		{

						window.history.back();

		}

		$scope.viewDoc2=function(docPhone){

			doctorServices.myDoctorsDetails(docPhone).then(function(response){
						$scope.myDocDetail=response;
						console.log(response);
						$state.go('app.results');
					}).catch(function(error){
					console.log('failure data', error);
					});

					$scope.myDoctorRatings={}
					rateDoctorServices.getDocRatingsByAll(docPhone).then(function(response){
				 	$scope.myDoctorRatings=response;//store the response array in doctor details

					$scope.ratings = [{
								 current: $scope.myDoctorRatings,
								 max: 5
						 }, ];
						 console.log($scope.ratings);
				  }).catch(function(error){
				  console.log('failure data', error);
				  });

		}



			$rootScope.specialityList = {};

			$scope.showSideMenu = function (selectedSearch){

					if (selectedSearch == "gender")
					{
							$rootScope.specialityList = [
								{'special': 'Male'},
								{'special': 'Female'}
							]

				};
				if (selectedSearch == "language") {

					$rootScope.specialityList = [
								{'special': 'English'},
								{'special': 'Kannada'},
								{'special': 'Hindi'},
								{'special': 'Tamil'},
								{'special': 'Telugu'}
					]

				};

				if (selectedSearch == "onlineOffline") {

					$rootScope.specialityList = [

							{'special': 'Online'},
							{'special': 'Offline'}
					]

				};
				//Make API request and get the data
				if (selectedSearch == "speciality")
				{

							searchDoctorServices.specialitySearch().then(function(response){
							$rootScope.specialityList=response;


					}).catch(function(error){
						console.log('failure data', error);
					});

				};

				$rootScope.sideMenuForSearch = true;
				$ionicSideMenuDelegate.toggleRight();
			}


			$scope.sidemenu = {};


			$scope.h1 = function(val)	{


					if(val === "Asthma Specialist " || val === "Ayurvedic Doctor " || val === "Cardiologist" || val === "Dentist " || val == "Dermatologist" || val === "Dietician/Nutritionist" || val === "Ear-nose-throat specialist" || val === "Gastroenterologist" || val === "General Physician " || val === "Gynecologist" || val === "Homeopathy" || val === "Lactation Consultant " || val === "Neurologist" || val === "Obstetrician/Gynecologist " || val === "Orthopaedic Surgeon" || val === "Pediatrician" || val === "Psychiatrist" || val === "Veterinarian")
					{

						$scope.specfic = val;

					}

					if(val == "Female" || val == "Male")
					{

							if(val === "Male")
							{

								$scope.gender = "M";


							}
							else
							{

								$scope.gender = "F";

							}


					}

				if(val == "Offline" || val == "Online")
				{

					if(val === "Online")
					{

							$scope.onoff = 1;

					}
					else
					{

							$scope.onoff = 2;

					}


				}

				if(val == "Kannada" ||  val == "English" || val == "Hindi" ||  val == "Telugu" || val == "Tamil")
				{

					$scope.languagedata = val;

				}


					 searchbyspecialities.specialitywisesearch($scope.specfic);
					 searchbyspecialities.categorywisesearch($scope.gender);
					 searchbyspecialities.genderwisesearch($scope.onoff);
					 searchbyspecialities.languagewisesearch($scope.languagedata);

					$scope.specialdata =  searchbyspecialities.getSpecialData();
						$scope.genderdata =  searchbyspecialities.getcategoryData();
							$scope.statusdata =  searchbyspecialities.getgenderData();
								$scope.languagedataselected =  searchbyspecialities.getlanguageData();




			}

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
												 $scope.doclist = response;
												 console.log(response);
										}
										else {
												//$state.go('templates.doctorsearch');
												console.log(response);
											$rootScope.doclist = "no doctors found";
										}
									}).catch(function (response, data, status, header) {
									});
							}
				}

	//signout
	$rootScope.signOut = function (){
		console.log('signOut');
		alert('Are you sure, You want to Signout from the App?');

		$state.go('auth.loginNew');
	}

	$scope.confirmSignout = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'DoctorQuick',
     template: 'Are you sure you want to Signout?',
		 cssClass: 'videoPopup',
			scope: $scope,
			buttons: [
				{
					text: 'Cancel',
					type: 'button-royal',
				},
				{
					text: 'Ok',
					type: 'button-positive',
					 onTap: function(e) {
						//  signOut();
						$ionicLoading.show();
						console.log('ok cliked');
						$window.localStorage.clear();

						$window.location = '/';

						$ionicLoading.hide();
					 }
				},
			 ]
   });

   confirmPopup.then(function(res) {
     if(res) {

			 $state.go('auth.loginNew');
     } else {
       // Do nothing
			 $state.go('app.patient_home');
     }
   });
 		};

 $rootScope.toggleLeftSideMenu = function () {
	 $rootScope.sideMenuForSearch = false;
	 $ionicSideMenuDelegate.toggleRight();
 }


 	$scope.medicalSpeciality = function(){
      medicalSpecialityService.getMedicalSpecialist()
			.then(function(response){
				console.log('appctrl called');
          console.log('successfull data', response);
          $scope.specialitiesList = response;

       }).catch(function(error){
           console.log('failure data', error);
       });

		$state.go('app.medical_speciality');
	}

	$scope.getSpecialityDetail=function(specialId){

		console.log(specialId);

		$localStorage.SpecilityId=specialId;

		medicalSpecialityService.getMedicalSpeciality(specialId)
		 .then(function(response){
				console.log('Details', response);
				$scope.specialityDetails = response;
				$state.go('app.specialityDetailsNew');
		 }).catch(function(error){
				 console.log('failure data', error);
		 });
	};

	$scope.getPatientDetails = function(){
			$state.go('app.patient_profile');
						$scope.patient_details ={};
	}

	$scope.changePwd=function(){
		$state.go('app.changePassword_patient');
	}

	$rootScope.login={};
	$rootScope.ratedBy;
		$scope.updatePwd=function(){
			$rootScope.ratedBy=$scope.login.userPhone;

			var newPwd={
			newPwd1:$scope.login.password,
			userPhone:$scope.login.userPhone
			};
			 console.log(userPhone);
			patientProfileDetailsService.changePwd2(newPwd)
			.then(function(response){
			console.log(response);

			}).catch(function(error){
			console.log('failure data', error);
			});

		}

	$scope.myDoctors=function(){
		$state.go('app.my_doctors');
	}

		$scope.myConsultations=function(){
				// $scope.userPhone=LoginService.returnUserPhone();
				// 	var patient_phone=$scope.userPhone;
					myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
					$scope.myconsultations=response;
					 console.log($scope.myconsultations);
				}).catch(function(error){
				console.log('failure data', error);
				});
		}

//Rating functionality

$scope.ratingsObject = {
	iconOn: 'ion-ios-star',    //Optional
	iconOff: 'ion-ios-star-outline',   //Optional
	rating:  $scope.myRating, //fetch value from database if already rated
	minRating:0,    //Optional
	//	readOnly: true, //Optional
	callback: function(rating) {    //Mandatory
		$scope.ratingsCallback(rating);
	}

};



	$scope.ratings = [{ name: 'DocRating', number: '3.5' }]

   $scope.getStars = function(rating) {
     // Get the value
     var val = parseFloat(rating);
     // Turn value into number/100
     var size = val/5*100;
     return size + '%';
   }

	 $scope.getWallet=function(){
     $rootScope.patientWalletdetails ={};
		 $rootScope.patientTransactiondetails ={};
		 $state.go('app.patient_payments');
   }

	 $scope.balAmnt;
	 $rootScope.myBalance;
	//  $scope.gotoTopUp=function(balance){
	// 	 console.log('balance details',$rootScope.patientWalletdetails);
	// 	 $scope.balAmnt=balance
	// 	//  var balanceAmount={
	// 	// 	 balance:$scope.balAmnt
	// 	//  };
	// 	//  $rootScope.myBalance=balanceAmount;
	// 	//  console.log($rootScope.myBalance);
	//  }
	/*image upload code goes here*/
	$scope.changePhoto = function() {
		$state.go('app.capture');
	  console.log('upload picture');
	};


});
