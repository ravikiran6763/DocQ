DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope, $timeout, $ionicPlatform, $window, $ionicHistory, $interval, $ionicModal, $ionicPopover, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, LoginService, patientProfileDetailsService, searchDoctorServices, doctorServices, medicalSpecialityService, myConsultationService, rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices,medicalSpecialityService, callAcceptedService) {

console.log('appCtrl');
	$rootScope.headerTxt='';
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$rootScope.doclist = {};
	$scope.myDocDetail = {};



$scope.deviceAndroid = ionic.Platform.isAndroid();
$scope.devicePlatform = ionic.Platform.isIOS();

console.log($scope.deviceAndroid );
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$timeout( function() {
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);

	};
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
				// $scope.specfic = {};
				//
				// $scope.onoff = {};
				// $scope.languagedata = {};

			$scope.h1 = function(val)	{


					if(val === "Asthma Specialist " || val === "Ayurvedic Doctor " || val === "Cardiologist" || val === "Dentist " || val == "Dermatologist" || val === "Dietician/Nutritionist" || val === "Ear-nose-throat specialist" || val === "Gastroenterologist" || val === "General Physician " || val === "Gynecologist" || val === "Homeopathy" || val === "Lactation Consultant " || val === "Neurologist" || val === "Obstetrician/Gynecologist " || val === "Orthopaedic Surgeon" || val === "Pediatrician" || val === "Psychiatrist" || val === "Veterinarian")
					{

						$scope.specfic = val;

					}

					if(val == "Female" || val == "Male")
					{

							if(val === "Male")
							{

								$scope.gender = "Male";


							}
							else
							{

								$scope.gender = "Female";

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

	//signout

	$scope.confirmSignout = function() {



		var unametologout = "greet+"+$localStorage.user;

		var pwtologout = "DQ_patient";


		console.log(unametologout);
		console.log(pwtologout);



		var success = function(message)
		{
			alert(message);
		}

		var failure = function()
		{
			alert("Error calling Hello Plugin");
		}


		hello.logout(unametologout,pwtologout,success, failure);
		// hello.logout(unametologout,pwtologout,success, failure);
		//hello.logout(unametologout,pwtologout,success, failure);

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
					console.log('ok');
					// $window.location = '/';
					// // $urlRouterProvider.otherwise('/auth/loginNew');
					//
					// $ionicLoading.hide();

					// $scope.logout = function() {

					// Clear all cache and history
					// $timeout(function () {
					$ionicHistory.clearCache();
					$ionicHistory.clearHistory();
					$window.localStorage.clear();
						$state.go('auth.loginNew');
					// }, 100)

					}
					},
					]
					});
 		};

 $rootScope.toggleLeftSideMenu = function () {
	 $rootScope.sideMenuForSearch = false;
	 $ionicSideMenuDelegate.toggleRight();
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
			userPhone:$localStorage.user
			};
			console.log(newPwd);
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

		// $scope.myConsultations=function(){
		// 		// $scope.userPhone=LoginService.returnUserPhone();
		// 		// 	var patient_phone=$scope.userPhone;
		// 			myConsultationService.myConsultedDoctors($localStorage.user).then(function(response){
		// 			$scope.myconsultations=response;
		// 			 //console.log($scope.myconsultations);
		// 		}).catch(function(error){
		// 		console.log('failure data', error);
		// 		});
		// }

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


	$interval(callReqInterval, 60000);

	function callReqInterval() {
		console.log($localStorage.user);
		medicalSpecialityService.callAccepted($localStorage.user).then(function(response){
				console.log('successfull data', response);
				$scope.calledDetails=response;
				// console.log($scope.calledDetails);
				var data=$scope.calledDetails//take all json data into this variable
				 var totList=[];
						for(var i=0; i<data.length; i++){

								$rootScope.cal_flag=data[i].cal_flag,
								$rootScope.callId=data[i].callId,
								$rootScope.onoff=data[i].onoff,
								$rootScope.doctorPhone=data[i].doctorPhone,


								$scope.callFlag='4';
						console.log($rootScope.cal_flag);





						$localStorage.Doctocall =  $rootScope.doctorPhone;


						if($rootScope.cal_flag === '4'){

							// alert('readyforcall');

							$ionicPopup.alert({
							title: 'Call Request Accepted',
							template:' A Doctor has accepted your call request',
							cssClass: 'videoPopup',
							buttons: [
								{
								text: 'Ok',
								type: 'button-assertive',
								onTap: function(e) {

									$state.go('app.callAccepted');
								}
								},
							]
							})
						}
						}

		 }).catch(function(error){
				 console.log('failure data', error);
		 });
				// console.log('callAtInterval');
	}

	$scope.declineCall=function(){
		var calldecline={
			patient:$localStorage.user,
			doctor:$rootScope.doctorPhone,
			callId:$rootScope.callId

		}

		callAcceptedService.callDeclined(calldecline).then(function(response){
		$scope.declineStatus=response;
		 console.log($scope.declineStatus);
	}).catch(function(error){
	console.log('failure data', error);
	});
	$state.go('app.patient_home')

	  console.log('decline clicked');
	}

	$ionicModal.fromTemplate('<ion-modal-view><ion-header-bar class="bar-energized"><h1 class="title">ion-modal-view</h1><a class="button" ng-click="closeModal();">关闭</a></ion-header-bar><ion-content>Hello!</ion-content></ion-modal-view>', {
         scope: $scope,
         animation: "slide-in-up"
     },function(modal) {
         $scope.modal = modal;
     });
     $scope.openModal = function() {
         $scope.modal.show();
     };
     $scope.closeModal = function() {
         $scope.modal.hide();
     };


});
