DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope, $timeout, $ionicPlatform, $cordovaDevice, $window, $ionicHistory, $interval, $ionicModal, $ionicPopover, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, $cordovaNetwork, LoginService, patientProfileDetailsService, searchDoctorServices, doctorServices, medicalSpecialityService, myConsultationService, rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices,medicalSpecialityService, callAcceptedService,testresultbydoctor) {

	$rootScope.headerTxt='';
	$rootScope.showBackBtn=false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.showDocStatus=false;
	$scope.myDocDetail = {};

	$rootScope.showSPecialities=false;
	$rootScope.showSex=false;
	$rootScope.showStatus=false;
	$rootScope.showLanguage=false;

	$rootScope.chekDiag=false;
	$rootScope.chekTests=false;
	$rootScope.chekMedi=false;
	// console.log($rootScope.chekDiag);

	$scope.accptNotifications=false;
	$scope.rejectNotifications=true;

// var model = $cordovaDevice.getModel();
// console.log(model);
$localStorage.reqSent="";
// console.log($localStorage.reqSent);

$scope.deviceAndroid = ionic.Platform.isAndroid();
$scope.devicePlatform = ionic.Platform.isIOS();

//var networkState= $cordovaNetwork.isOnline();
////////////////////////////////////////////////////////////////////////////////
//console.log(networkState);
$interval(checkForInternet, 1000);

$localStorage.chekedData =0;
$localStorage.dataConnection=navigator.onLine;
////////////////////////////////////////////////////////////////////////////////
$interval(checkForInternet, 5000);
function checkForInternet() {

if(!navigator.onLine ){
	$localStorage.dataConnection=navigator.onLine;
	if($localStorage.dataConnection === false && $localStorage.chekedData == 0){
		var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: 'Seems you are disconnected from the internet',
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
								$localStorage.chekedData = 1;
								$state.go('auth.loginNew');
							// }, 100)

						}
					},
					]
					});
	}
}
}
console.log($localStorage.dataConnection);

document.addEventListener("deviceready", function (){
    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()
		console.log(type);

		if( type != 'WIFI' || type != '4g'){
			console.log('wifi');
		}
    // listen for Online event
    $rootScope.$on('networkOffline', function(event, networkState){
      var onlineState = networkState;
			console.log(onlineState);
    })

    // listen for Offline event
    $rootScope.$on('networkOffline', function(event, networkState){
      var offlineState = networkState;
			console.log(offlineState);
    })

  }, false);



////////////////////////////////////////////////////////////////////////////////

// console.log($ionicHistory.currentStateName());
if($ionicHistory.currentStateName() === 'app.patient_home'){
	// $localStorage.reqSent=0;
	console.log($ionicHistory.currentStateName() );
	$ionicHistory.nextViewOptions({
					disableBack: true
			});
}
// console.log($scope.deviceAndroid );
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



		$rootScope.goBack = function ()
		{
						$scope.prevPage=$ionicHistory.currentStateName();
						console.log($ionicHistory.currentStateName());
						if($scope.prevPage === 'app.patient_summary'){
							$state.go('app.patient_home');
						}
						else if($scope.prevPage === 'templates.notesForPatient'){
							$state.go('templates.doctor_home');
						}
						else if($scope.prevPage === 'templates.requestAccepted'){
							$state.go('templates.doctor_home');
						}
						else if($scope.prevPage === 'app.patient_home' || $scope.prevPage === 'templates.doctor_home'){
							// $state.go('templates.doctor_home');
							console.log('donothing');
						}
						else if($scope.prevPage === 'app.results'){
							$state.go('app.searchDoctors');
						}
						else if($scope.prevPage === 'app.specialityDetailsNew'){

							$localStorage.reqSent=0;
							console.log($localStorage.reqSent);
							window.history.back();

						}
						else if($scope.prevPage === 'app.doctorsearch'){
							console.log('clear search values here');
							$scope.specialdata='';
							$scope.genderdata='';
							$scope.statusdata='';
							$scope.languagedataselected='';

							console.log($scope.specialdata);
							window.history.back();

						}
						else if($scope.prevPage === 'templates.notesForPatient'){
							$state.go('templates.doctor_home');
						}
						else{
							window.history.back();
							$localStorage.reqSent=0;
							}
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
			$rootScope.sexList = {};
			$rootScope.LanguageList = {};
			$rootScope.statusList = {};


			$scope.showSideMenu = function (selectedSearch){
				console.log(selectedSearch);
					if (selectedSearch == "gender")
					{

							$rootScope.sexList = [
								{'sex': 'Male'},
								{'sex': 'Female'}
							]
							$rootScope.SearchHeader='Gender';
							$rootScope.showSPecialities=false;
							$rootScope.showSex=true;
							$rootScope.showStatus=false;
							$rootScope.showLanguage=false;

								console.log($rootScope.sexList);
				};
				if (selectedSearch == "language") {

					$rootScope.LanguageList = [
								{'lang': 'English'},
								{'lang': 'Kannada'},
								{'lang': 'Hindi'},
								{'lang': 'Tamil'},
								{'lang': 'Telugu'}
					]
					$rootScope.SearchHeader='Language';
					$rootScope.showSPecialities=false;
					$rootScope.showSex=false;
					$rootScope.showStatus=false;
					$rootScope.showLanguage=true;
						console.log($rootScope.LanguageList);
				};

				if (selectedSearch == "onlineOffline") {
					$rootScope.showSearchOption=true;

					$rootScope.statusList = [

							{'stat': 'Online'},
							{'stat': 'Offline'}
					]
					$rootScope.SearchHeader='Online/Offline';
					$rootScope.showSPecialities=false;
					$rootScope.showSex=false;
					$rootScope.showStatus=true;
					$rootScope.showLanguage=false;

				};
				//Make API request and get the data
				$rootScope.specialityList1={};
				if (selectedSearch == "speciality")
				{
					$rootScope.SearchHeader='Speciality';
					$rootScope.showSPecialities=true;
					$rootScope.showSex=false;
					$rootScope.showStatus=false;
					$rootScope.showLanguage=false;
					$ionicLoading.show();

							searchDoctorServices.specialitySearch().then(function(response){
							$rootScope.specialityList1=response;
							if($rootScope.specialityList1){
								$ionicLoading.hide();
							}


					}).catch(function(error){
						console.log('failure data', error);
					});

				};

				$rootScope.sideMenuForSearch = true;
				$ionicSideMenuDelegate.toggleRight();
			}


			$scope.sidemenu = {};
			$scope.choice='';
			$scope.h1 = function(val)	{
					if(val === "Asthma Specialist " || val === "Ayurvedic Doctor " || val === "Cardiologist" || val === "Dentist " || val == "Dermatologist" || val === "Dietician/Nutritionist" || val === "Ear-nose-throat specialist" || val === "Gastroenterologist" || val === "General Physician " || val === "Gynecologist" || val === "Homeopathy" || val === "Lactation Consultant " || val === "Neurologist" || val === "Obstetrician/Gynecologist " || val === "Orthopaedic Surgeon" || val === "Pediatrician" || val === "Psychiatrist" || val === "Veterinarian")
					{
						$scope.specfic = val;
						$scope.choice= val;
						console.log($scope.specfic);
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
						console.log($scope.languagedata );
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
							console.log('Please Select Atlease One Search Criteria');
						}
						else
						{
							console.log(specialitywise);
							/* Patients Selected One of the Search Criteria */
								var searchdoctor = {
									byspecial:specialitywise,
									bygender:catwise,
									bystatus:genderwise,
									bylanguage:languagewise
								};
								console.log(searchdoctor);
								searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
									if(Object.keys(response).length)
									{
										$state.go('app.doctorsearch');
										$ionicLoading.show();
										console.log('result fetched');
											 $scope.doclist = response;
											 console.log($scope.doclist);
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

		// hello.logout(unametologout,pwtologout,success, failure);

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
							LoginService.logoutFromDq($localStorage.user).then(function(response){
							$scope.loggedOut=response;
								console.log($scope.loggedOut);
								if($scope.loggedOut){
									$ionicHistory.clearCache();
									$ionicHistory.clearHistory();
									$window.localStorage.clear();
									$state.go('auth.loginNew');
								}
							}).catch(function(error){
							console.log('failure data', error);
							});


						}
					},
					]
					});

//popup modification




 }

 $rootScope.toggleLeftSideMenu = function () {
	 $rootScope.sideMenuForSearch = false;
	 $ionicSideMenuDelegate.toggleRight();
 }

	$scope.getPatientDetails = function(){
			$state.go('app.patient_profile');
						$scope.patient_details ={};
	}

	$scope.changePwd=function(){
		$state.go('app.changePassword_patient');
	}
	$scope.changeDocPwd=function(){
		$state.go('templates.updatePassword');
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
		$scope.updateDocPwd=function(){
			$rootScope.ratedBy=$scope.login.userPhone;
			console.log('dddd');
			var newPwd={
			newPwd1:$scope.login.password,
			userPhone:$localStorage.user
			};
			console.log(newPwd);
			doctorServices.changeDocPwd(newPwd)
			.then(function(response){
			console.log(response);

			}).catch(function(error){
			console.log('failure data', error);
			});

		}
	$scope.myDoctors=function(){
		$state.go('app.my_doctors');
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

	//  console.log($localStorage.seen);
	// $interval(callReqInterval, 15000);
$localStorage.ViewDoc=0;
	function callReqInterval() {
		console.log($ionicHistory.currentStateName());
		if($ionicHistory.currentStateName() != 'auth.loginNew'){

			medicalSpecialityService.callAccepted($localStorage.user).then(function(response){
						// console.log('successfull data', response);
						$scope.calledDetails=response;
						console.log($rootScope.online);
						console.log($scope.calledDetails);
						var data=$scope.calledDetails;//take all json data into this variable
						 var totList=[];
								for(var i=0; i<data.length; i++){

										$rootScope.cal_flag=data[i].cal_flag,
										$rootScope.callId=data[i].callId,
										$rootScope.onoff=data[i].onoff,
										$rootScope.doctorPhone=data[i].doctorPhone,
										$rootScope.popupSeen=data[i].popupSeen,
										$rootScope.accptdDocFname=data[i].doctorFname,
										$rootScope.accptdDocLname=data[i].doctorLname,


								console.log($rootScope.popupSeen);

								$localStorage.Doctocall =  $rootScope.doctorPhone;
								if($rootScope.cal_flag === '4'  && $rootScope.popupSeen === '1' ){

														 $ionicPopup.confirm({
																		title: '<i class="ion-checkmark-circled" style="font-size: 20vw !important; color: #6fa02d !important;"></i><br/>',
																		template: '<center><b>Dr {{accptdDocFname}} {{accptdDocLname}}</b><br> has accepted your invitation for a consultation. Please start the consultation now or decline.</center>',
																		cssClass: 'videoPopup',
																		scope: $scope,
																		buttons: [
																							{
																							text: 'Decline',
																							type: 'button-royal',
																							onTap: function(e) {
																											 console.log('Decline');
																										 }
																							},
																							{
																								text: 'View',
																								type: 'button-positive',
																								onTap: function(e) {
																									console.log($rootScope.callId);
																									callAcceptedService.acceptPopUpSeen($rootScope.callId).then(function(response){
																										$scope.popupSTATUS=response;
																										console.log($scope.popupSTATUS);
																									}).catch(function(error){
																									console.log('failure data', error);
																									});
																									$state.go('app.callAccepted');
																							}
																							},
																	]
																})

								}
								else{
									$localStorage.showPopup =2;
								}
								}

				 }).catch(function(error){
						 console.log('failure data', error);
				 });

		}


				// console.log('callAtInterval');
	}

	$scope.declineCall=function(){
			var calldecline={
			patient:$localStorage.user,
			doctor:$rootScope.doctorPhone,
			callId:$rootScope.callId

			}
			$localStorage.ViewDoc=0;
			callAcceptedService.callDeclined(calldecline).then(function(response){
				$scope.declineStatus=response;
				console.log($scope.declineStatus);
			}).catch(function(error){
			console.log('failure data', error);
			});
				$state.go('app.patient_home')
				console.log('decline clicked');
	}

//video call in search

$scope.checkWalletBalance=function()
{
	$ionicLoading.show();
	doctorServices.checkMyBalance($localStorage.user).then(function(response){
		// console.log(response[0][0]);
	$scope.myBalance=response[0][0];
	$localStorage.patientWalletBalance=$scope.myBalance;
			console.log('pop up page clicked');
				var uname = "greet+"+$localStorage.user;
				 var pw = "DQ_patient";

				 var persontocall = "greet+" + $localStorage.docPhone;
				//  var persontocall = "greet+" + $localStorage.consultedDoctor;


				 console.log(uname);
				 console.log(persontocall);

				 var success = function(message)
					{
							alert(message);
					}
					var failure = function()
					{
						alert("Error calling Hello Plugin");
					}


		if($scope.myBalance >= 250)
		{

			hello.greet(uname,pw,persontocall,success, failure);


			var confirmPopup = $ionicPopup.confirm({
				template: '<b>Request for Video call has been sent <br><center>00:02</center></b>',
				cssClass: 'videoPopup',
				scope: $scope,
				buttons: [
					 { text: 'Cancel',
						 type: 'button-royal', },

					 {
					 text: 'Resend',
					 type: 'button-positive',

					 },
				 ]
				//templateUrl: "views/app/viewdoctor_profile.html",
			});


		}
		else
		{

			var confirmPopup = $ionicPopup.confirm({
				template: '<b>Your DoctorQuick Balance is too low.</b>',
				cssClass: 'videoPopup',
				scope: $scope,
				buttons: [
					{
						text: 'Cancel',
						type: 'button-royal', },
					{

					text: 'Topup',
					type: 'button-positive',
					 onTap: function(e) {
							$state.go('app.patient_topup');
					 }

					},
				 ]
				//templateUrl: "views/app/viewdoctor_profile.html",
			});

		}
			$ionicLoading.hide();
		}).catch(function(error){
	console.log('failure data', error);
	});

}



$scope.BalanceForVoiceCall=function()
{
  $ionicLoading.show();
  doctorServices.checkMyBalance($localStorage.user).then(function(response){
    // console.log(response[0][0]);
    $scope.myBalance=response[0][0];
    var uname = "greet+"+$localStorage.user;
     var pw = "DQ_patient";

     var persontocall = "greet+" + $localStorage.docPhone;
    //  var persontocall = "greet+" + $localStorage.consultedDoctor;
     console.log(uname);
     console.log(persontocall);

     var success = function(message)
      {
          alert(message);
      }
      var failure = function()
      {
        alert("Error calling Hello Plugin");
      }



    if($scope.myBalance >= 250)
    {
      hello.audiocallvsee(uname,pw,persontocall,success, failure);
      var confirmPopup = $ionicPopup.confirm({
        template: '<b>Request for Voice call has been sent <br><center>00:02</center></b>',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
           { text: 'Cancel',
             type: 'button-royal', },

           {
           text: 'Resend',
           type: 'button-positive',

           },
         ]
        //templateUrl: "views/app/viewdoctor_profile.html",
      });
    }
    else
    {
      var confirmPopup = $ionicPopup.confirm({
        template: '<b>Your DoctorQuick Balance is too low.</b>',
        cssClass: 'videoPopup',
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            type: 'button-royal', },
          {
          text: 'Topup',
          type: 'button-positive',
           onTap: function(e) {
              $state.go('app.patient_topup');
           }
          },
         ]
        //templateUrl: "views/app/viewdoctor_profile.html",
      });
    }
      $ionicLoading.hide();
    }).catch(function(error){
  console.log('failure data', error);
  });

}

/////////////Show and hide notification////////////////////////////////////////

		$scope.hideNotifications = function (message) {
			console.log(message);
			$scope.accptNotifications=true;
			$scope.rejectNotifications=false;

		};
		$scope.showNotifications = function (message) {
					console.log(message);
					$scope.accptNotifications=false;
					$scope.rejectNotifications=true;

				};

///prescription par
$rootScope.prescription={};


//
// $scope.done=function()
// {
// 	console.log($rootScope.prescription.diagnosisforpatient);
// 		if($rootScope.prescription.diagnosisforpatient)
// 		{
// 				testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
// 				$rootScope.chekDiag=true;
// 				$rootScope.val=$rootScope.prescription.diagnosisforpatient;
// 				$state.go("templates.notesForPatient");
// 		}
//
// 		if($rootScope.prescription.checkedTests)
// 		{
// 				testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
// 				$rootScope.chekDiag=true;
// 				$rootScope.val=$rootScope.prescription.checkedTests;
// 				$state.go("templates.notesForPatient");
// 		}
//
//
//
// 		else
// 		{
// 					alert('Please Enter Something')
// 		}
// }

$scope.done = function (prescType,sno){

        switch(sno){
            case 1://for diagnosis
											testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
											$rootScope.chekDiag=true;
											$rootScope.val=$rootScope.prescription.diagnosisforpatient;
											$state.go("templates.notesForPatient");
                // console.log("1. Selected Name: "+ prescType);
                break;
            case 2://for tests
											testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
											$rootScope.chekTests=true;
											$rootScope.val=$rootScope.prescription.checkedTests;
											$state.go("templates.notesForPatient");
                console.log("2. Selected Name: " + prescType );
                break;
						case 3://for medications
											testresultbydoctor.medicationdone($rootScope.prescription.medicationforpatient);
											$rootScope.chekMedi=true;
											$rootScope.mediVal=$rootScope.prescription.medicationforpatient;
											$state.go("templates.notesForPatient");

                console.log("3. Selected Name: " + prescType );
                break;
            default:console.log('default');

        }
    }
		console.log($rootScope.prescription);
$scope.clear=function()
{
		$scope.diagnosis.diagnosisforpatient="";
		$rootScope.chekDiag=false;
}


$scope.sendprescription = function()
{
  console.log($rootScope.prescription.checkedTests);
    $scope.diagnosis = testresultbydoctor.getdiagnosis();
    $scope.tests = testresultbydoctor.gettests();
    $scope.medication = testresultbydoctor.getmedication();

    if($rootScope.chekDiag && $rootScope.chekMedi && $rootScope.chekTests)
    {
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      $scope.tests = testresultbydoctor.gettests();
      $scope.medication = testresultbydoctor.getmedication();


    }
    else if($rootScope.chekDiag && $rootScope.chekTests)
    {
        alert('You Missed Medication');
        $scope.diagnosis = testresultbydoctor.getdiagnosis();
        $scope.tests = testresultbydoctor.gettests();
        var diagandtests = {
          diagnosis : $scope.diagnosis,
          tests : $scope.tests
        }
        console.log(diagandtests);
    }
    else if($rootScope.chekDiag && $rootScope.chekMedi)
    {
      alert('You Missed Tests');
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      $scope.medication = testresultbydoctor.getmedication();
      var diagandmedication = {
      diagnosis : $scope.diagnosis,
      medication : $scope.medication
      }
      console.log(diagandmedication);
    }
    else if($rootScope.chekTests && $rootScope.chekMedi)
    {
      alert('You Missed Diagnosis');
      $scope.tests = testresultbydoctor.gettests();
      $scope.medication = testresultbydoctor.getmedication();
      var testsandmedication = {
      tests : $scope.tests,
      medication : $scope.medication
      }
      console.log(testsandmedication);
    }
    else if($rootScope.chekDiag)
    {
      alert('You have Missed tests and Medication');
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      var onlydiagnosis = {
      diagnosis : $scope.diagnosis
      }
      console.log(onlydiagnosis);
    }
    else if($rootScope.chekTests)
    {
      alert('You have Missed Diagnosis and Medication');
      $scope.tests = testresultbydoctor.gettests();
      var onlytests = {
      tests : $scope.tests
      }
      console.log(onlytests);
    }
    else if($rootScope.chekMedi)
    {
      alert('You have Missed Diagnosis and Tests');
      $scope.medication = testresultbydoctor.getmedication();
      var onlymedication = {
      medication : $scope.medication
      }
      console.log(onlymedication);
    }
    else
    {
      console.log('Please Select Atleast One Tests')
    }

    if($rootScope.chekDiag || $rootScope.chekTests || $rootScope.chekMedi)
    {
        var prescriptiondetails = {
          docphno : $localStorage.user,
          patientphno : $localStorage.reqPat,
          diagnosis : $scope.diagnosis ,
          tests : $scope.tests ,
          medication : $scope.medication
        };

console.log($rootScope.chekDiag);

        //test jpeg image response
        testresultbydoctor.jpegtest(prescriptiondetails).then(function(response){
        // console.log(response);
        $scope.pic=response
        console.log(prescriptiondetails);

        if($scope.pic){
          var auname =  "greet+"+$localStorage.user;
          var apw = "DQ_doctor";
          var ato = "greet+" + $localStorage.reqPat;

          console.log(auname);
          console.log(ato);
          var prescImg=$scope.pic;



            var success = function(message)
            {
              alert(message);
            }

            var failure = function()
            {
              alert("Error calling Hello Plugin");
            }

            hello.automatic(auname,apw,ato,prescImg,success, failure);


          }
        // $rootScope.prescription = "data:image/jpeg;base64," + $scope.pic;
        // var URL = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
        // console.log(cordova.file.externalRootDirectory);
        }).catch(function(error){
        console.log('failure data', error);
        });

    }
    // console.log(URL);
}


});
