DoctorQuickApp.controller('AppCtrl', function($state, $scope, $rootScope, $timeout,$location, $ionicPlatform, $ionicPush, $ionicAuth,$cordovaDevice, $window, $ionicHistory, $interval, $ionicModal, $ionicPopover, $ionicLoading, $ionicConfig, $ionicPopup,$http, $ionicSideMenuDelegate, $localStorage, $sessionStorage, $cordovaInAppBrowser,$cordovaCamera, $cordovaNetwork, LoginService, patientProfileDetailsService,searchDoctorServices, doctorServices, medicalSpecialityService,myConsultationService,rateDoctorServices,patientWalletServices,searchbyspecialities,rateDoctorServices,medicalSpecialityService, callAcceptedService,testresultbydoctor,searchDoctorServices) {

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


var specialitywise = "";
var catwise = "";
var genderwise = "";
var languagewise = "";





	$rootScope.chekDiag=false;
	$rootScope.chekTests=false;
	$rootScope.chekMedi=false;
	// console.log($rootScope.chekDiag);

	$scope.accptNotifications=false;
	$scope.rejectNotifications=true;
	$rootScope.sandwich=false;
// var model = $cordovaDevice.getModel();
// console.log(model);
console.log('appcalld');

$scope.deviceAndroid = ionic.Platform.isAndroid();
$scope.devicePlatform = ionic.Platform.isIOS();

// $interval.cancel(checkAcceptedReq,2000);

// console.log($location.path());
ion.sound({
    sounds: [
        {
            name: "beer_can_opening",
						volume: 0.2
        },
        {
            name: "notify_sound",
            volume: 0.2
        },
        {
            name: "bell_ring",
            volume: 0.1,
            preload: false
        }
    ],
    volume: 0.5,
    path: "sounds/",
    preload: true
});

// play sound
// ion.sound.play("beer_can_opening");
//ion.sound.stop("witchdoctor");

$scope.pushRegister = function() {
 console.log('Ionic Push: Registering user');
 $scope.accptNotifications=true;
 $scope.rejectNotifications=false;

 window.plugins.OneSignal.getIds(function(ids){
  console.log(ids);
 	var notificationObj = {
 		contents: {en: "You have new consultation request"},
 		include_player_ids: [ids.userId],
 		android_sound:'tring'
 	};

 });


};



//var networkState= $cordovaNetwork.isOnline();
////////////////////////////////////////////////////////////////////////////////
//console.log(networkState);
// $interval(checkForInternet, 1000);

$localStorage.chekedData =0;
$localStorage.dataConnection=navigator.onLine;
////////////////////////////////////////////////////////////////////////////////
$interval(checkForInternet, 5000,1);
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
// console.log($localStorage.dataConnection);

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

$rootScope.statename = $ionicHistory.currentStateName();

// console.log($rootScope.statename);
if($ionicHistory.currentStateName() === 'app.patient_home'){
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





		$rootScope.goBack = function()
		{




						$scope.prevPage=$ionicHistory.currentStateName();
						console.log($ionicHistory.currentStateName());
						if($scope.prevPage === 'app.patient_summary'){
							$state.go('app.patient_home');
						}
						else if($scope.prevPage === 'templates.prescription'){
							$state.go('templates.doctor_home');
						}
						else if($scope.prevPage === 'templates.requestAccepted'){
							$state.go('templates.doctor_home');
						}
						else if($scope.prevPage === 'app.patient_home' || $scope.prevPage === 'templates.doctor_home'){
							// $state.go('templates.doctor_home');
							console.log('donothing');
						}

						else if($scope.prevPage === 'app.specialityDetailsNew'){
							window.history.back();

						}
						else if($scope.prevPage === 'app.searchDoctors'){
							console.log('clear search values here');
							$scope.specialdata=null;
							$scope.genderdata= null;
							$scope.statusdata=null;
							$scope.languagedataselected=null;

							$rootScope.specialityList.sex = "";
							$rootScope.specialityList.search = "";
							$rootScope.specialityList.stat = "";
							$rootScope.specialityList.language = "";

							var specialitywise = "";
							var catwise = "";
							var genderwise = "";
							var languagewise = "";

							console.log($scope.specialdata);
							window.history.back();

						}
						else if($scope.prevPage === 'templates.prescription'){
							$state.go('templates.doctor_home');
						}
						else if($scope.prevPage === 'app.callAccepted'){
							// alert('decline call here');
							// ion.sound.play("bell_ring");
						}
						// else if($scope.prevPage === 'auth.patient_reg3'){
						// 	console.log($scope.otpentered);
						// 	$state.go('auth.patient_reg2');
						//
						// }
						else{
							window.history.back();
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
								 max: 5,
								 total:0
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


				}

				if (selectedSearch == "language")
				{


					$scope.LanguageList = angular.fromJson($window.localStorage['languages']);
					console.log($scope.LanguageList);

					$rootScope.SearchHeader='Language';
					$rootScope.showSPecialities=false;
					$rootScope.showSex=false;
					$rootScope.showStatus=false;
					$rootScope.showLanguage=true;

				}

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

					$scope.specialityList1 = angular.fromJson($window.localStorage['specialityList1']);
					console.log($scope.specialityList1);

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
							// $scope.onoff = 'Online';
							$scope.onoff = 1;

						}
						else
						{
							// $scope.onoff = 'Offline';
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

						//PUT ONE ERROR MESSAGE HERE
						if(specialitywise == null && catwise == null && genderwise == null && languagewise == null)
						{



							console.log('Please Select Atlease One Search Criteria');


							window.plugins.toast.showWithOptions({
							message: "Please Select Atlease One Search Criteria",
							duration: "short", // 2000 ms
							position: "bottom",
							styling: {
							opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
							backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
							textColor: '#ffffff', // Ditto. Default #FFFFFF
							textSize: 13, // Default is approx. 13.
							cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
							horizontalPadding: 16, // iOS default 16, Android default 50
							verticalPadding: 12 // iOS default 12, Android default 30
							}
							});
							$timeout(function() {
								 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
							}, 1000);



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
								$rootScope.rates=0;
								$rootScope.totalRates=0;
								searchbyspecialities.getlistofspecialist(searchdoctor).then(function (response) {
									if(Object.keys(response).length)
									{
										$state.go('app.doctorsearch');
										$ionicLoading.show();
										console.log('result fetched');
											 $scope.doclist = response;
											console.log($scope.doclist);
											 $ionicLoading.hide();

											 	var data=$scope.doclist;//take all json data into this variable
											 		for(var i=0; i<data.length; i++){

																$rootScope.rates=data[i].ratings,
																$rootScope.totalRates=data[i].totalRates

																if($rootScope.rates == null ){
																	$rootScope.rates=''
																}
																if($rootScope.totalRates == null ){
																	$rootScope.totalRates=''
																}
																console.log($rootScope.rates);

																$rootScope.DocRates= $rootScope.rates/$rootScope.totalRates;
																console.log('rates',$rootScope.DocRates);
																console.log('total',$rootScope.totalRates);

															$scope.ratings = [{
			 															 current: $rootScope.DocRates,
			 															 max: 5,
																		 total:$rootScope.totalRates
																	 }, ];

											 			}


									}
									else if(Object.keys(response).length == 0)
									{
										console.log('empty');
												var confirmPopup = $ionicPopup.confirm({
															 title: 'DoctorQuick',
															 template: 'No doctors are available right now!!',
															 cssClass: 'videoPopup',
															 scope: $scope,
															 buttons: [

															 {
																 text: 'Ok',
																 type: 'button-positive',
																 onTap: function(e) {
																 console.log('ok');

															 }
														 },
														 ]
														 });

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


   	var confirmPopup = $ionicPopup.confirm({
						title: 'DoctorQuick',
						template: '<center>Are you sure you want to Signout?</center>',
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





							LoginService.logoutFromDq($localStorage.user).then(function(response){
							$scope.loggedOut=response;
								console.log($scope.loggedOut);
								if($scope.loggedOut){
									$ionicHistory.clearCache();
									$ionicHistory.clearHistory();
									$window.localStorage.clear();


									var success = function(message)
									{
												console.log(message);

												$state.go('auth.loginNew');

<<<<<<< HEAD
=======

>>>>>>> 8493703e46ff3fdb380f28ecb5922baadbfecc01
									}
									var failure = function()
									{


										console.log('error calling hello plugin');


									}

							hello.logout(unametologout,pwtologout,success, failure);


								}



							}).catch(function(error){
							console.log('failure data', error);
							});


						}
					},
					]
					});



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


				window.plugins.toast.showWithOptions({
					message: "Your password has been updated.",
					duration: "short", // 2000 ms
					position: "bottom",
					styling: {
					opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
					backgroundColor: '#026451', // make sure you use #RRGGBB. Default #333333
					textColor: '#ffffff', // Ditto. Default #FFFFFF
					textSize: 13, // Default is approx. 13.
					cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
					horizontalPadding: 16, // iOS default 16, Android default 50
					verticalPadding: 12 // iOS default 12, Android default 30
				}
				});

	// window.history.back();

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
	function callReqInterval() {

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



//video call in search

$scope.checkWalletBalance=function()
{
	$ionicLoading.show();
	var calldecline={
	patient:$localStorage.user,
	doctor:$rootScope.doctorPhone,
	callId:$rootScope.callId
	}
	console.log(calldecline);
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

		$scope.hideNotifications = function (msg) {
			console.log(msg);
			$scope.accptNotifications=true;
			$scope.rejectNotifications=false;

 	// 	window.plugins.OneSignal.registerForPushNotifications(true);
		};
		$scope.showNotifications = function (msg) {
			alert(msg);
					$scope.accptNotifications=false;
					$scope.rejectNotifications=true;
					window.plugins.OneSignal.getIds(function(ids){
            //document.getElementById("OneSignalUserID").innerHTML = "UserID: " + ids.userId;
            //document.getElementById("OneSignalPushToken").innerHTML = "PushToken: " + ids.pushToken;
            console.log(JSON.stringify(ids['userId']));
            $scope.playerId=JSON.stringify(ids['userId']);
						alert('oneSignal')
            console.log($scope.playerId);
            var updatePlayer ={
              palyerId:$scope.playerId,
              userNum:$localStorage.user,
              user:'doctor'
            }
            alert(updatePlayer);
            LoginService.updatePlayer(updatePlayer).then(function(response){
              console.log(response);
            })
          });
				};






//
// $scope.done=function()
// {
// 	console.log($rootScope.prescription.diagnosisforpatient);
// 		if($rootScope.prescription.diagnosisforpatient)
// 		{
// 				testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
// 				$rootScope.chekDiag=true;
// 				$rootScope.val=$rootScope.prescription.diagnosisforpatient;
// 				$state.go("templates.prescription");
// 		}
//
// 		if($rootScope.prescription.checkedTests)
// 		{
// 				testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
// 				$rootScope.chekDiag=true;
// 				$rootScope.val=$rootScope.prescription.checkedTests;
// 				$state.go("templates.prescription");
// 		}
//
//
//
// 		else
// 		{
// 					alert('Please Enter Something')
// 		}
// }


///prescription par
$rootScope.prescription={};

$scope.done = function (prescType,sno){




        switch(sno){
            case 1://for diagnosis


											if($rootScope.prescription.diagnosisforpatient)
											{


												testresultbydoctor.diagnosisdone($rootScope.prescription.diagnosisforpatient);
												$rootScope.chekDiag=true;
												$rootScope.val=$rootScope.prescription.diagnosisforpatient;
												$state.go("templates.prescription");



											}
											else
											{

												//alert('please enter medication');

												window.plugins.toast.showWithOptions({
												message: "Please Enter Diagnosis",
												duration: "short", // 2000 ms
												position: "bottom",
												styling: {
												opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
												backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
												textColor: '#ffffff', // Ditto. Default #FFFFFF
												textSize: 13, // Default is approx. 13.
												cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
												horizontalPadding: 16, // iOS default 16, Android default 50
												verticalPadding: 12 // iOS default 12, Android default 30
												}
												});
												$timeout(function() {
													 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												}, 1000);


											 }



                break;
            case 2://for tests

											if($rootScope.prescription.checkedTests)
											{

												testresultbydoctor.testrecommended($rootScope.prescription.checkedTests);
												$rootScope.chekTests=true;
												$rootScope.testVal=$rootScope.prescription.checkedTests;
												$state.go("templates.prescription");


											}
											else {


												window.plugins.toast.showWithOptions({
												message: "Please Enter Tests",
												duration: "short", // 2000 ms
												position: "bottom",
												styling: {
												opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
												backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
												textColor: '#ffffff', // Ditto. Default #FFFFFF
												textSize: 13, // Default is approx. 13.
												cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
												horizontalPadding: 16, // iOS default 16, Android default 50
												verticalPadding: 12 // iOS default 12, Android default 30
												}
												});
												$timeout(function() {
													 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
												}, 1000);

												//alert('please enter tests details');



											}


                console.log("2. Selected Name: " + prescType );
                break;
						case 3://for medications

												if($rootScope.prescription.medicationforpatient)
												{

													testresultbydoctor.medicationdone($rootScope.prescription.medicationforpatient);
													$rootScope.chekMedi=true;
													$rootScope.mediVal=$rootScope.prescription.medicationforpatient;
													$state.go("templates.prescription");


												}
												else {


													window.plugins.toast.showWithOptions({
													message: "Please Enter Medication",
													duration: "short", // 2000 ms
													position: "bottom",
													styling: {
													opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
													backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
													textColor: '#ffffff', // Ditto. Default #FFFFFF
													textSize: 13, // Default is approx. 13.
													cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
													horizontalPadding: 16, // iOS default 16, Android default 50
													verticalPadding: 12 // iOS default 12, Android default 30
													}
													});
													$timeout(function() {
														 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
													}, 1000);


												}



                console.log("3. Selected Name: " + prescType );
                break;
            default:console.log('default');

        }
    }



$scope.sendprescription = function()
{


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
			window.plugins.toast.showWithOptions({
			message: "You Missed Medication",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
        // alert('You Missed Medication');
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
			window.plugins.toast.showWithOptions({
			message: "You Missed Tests",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      // alert('You Missed Tests');
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
			window.plugins.toast.showWithOptions({
			message: "You Missed Diagnosis",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      // alert('You Missed Diagnosis');
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
			window.plugins.toast.showWithOptions({
			message: "You have Missed tests and Medication",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      // alert('You have Missed tests and Medication');
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      var onlydiagnosis = {
      diagnosis : $scope.diagnosis
      }
      console.log(onlydiagnosis);
    }
    else if($rootScope.chekTests)
    {
			window.plugins.toast.showWithOptions({
			message: "You have Missed Diagnosis and Medication",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      // alert('You have Missed Diagnosis and Medication');
      $scope.tests = testresultbydoctor.gettests();
      var onlytests = {
      tests : $scope.tests
      }
      console.log(onlytests);
    }
    else if($rootScope.chekMedi)
    {
			window.plugins.toast.showWithOptions({
			message: "You have Missed Diagnosis and Tests",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      // alert('You have Missed Diagnosis and Tests');
      $scope.medication = testresultbydoctor.getmedication();
      var onlymedication = {
      medication : $scope.medication
      }
      console.log(onlymedication);
    }
    else
    {
			window.plugins.toast.showWithOptions({
			message: "Please Select Atleast One Tests",
			duration: "short", // 2000 ms
			position: "bottom",
			styling: {
			opacity: 1.0, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
			backgroundColor: '#9d2122', // make sure you use #RRGGBB. Default #333333
			textColor: '#ffffff', // Ditto. Default #FFFFFF
			textSize: 13, // Default is approx. 13.
			cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
			horizontalPadding: 16, // iOS default 16, Android default 50
			verticalPadding: 12 // iOS default 12, Android default 30
			}
			});
			$timeout(function() {
				 $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
			}, 1000);
      console.log('Please Select Atleast One Tests')
    }
		$scope.currentPatient = angular.fromJson($window.localStorage['currentPatient']);
		$rootScope.patientNum=$scope.currentPatient.patientNum;

    if($rootScope.chekDiag || $rootScope.chekTests || $rootScope.chekMedi)
    {
        var prescriptiondetails = {
          docphno : $localStorage.user,
          patientphno : $rootScope.patientNum,
          diagnosis : $scope.diagnosis,
          tests : $scope.tests,
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
          var ato = "greet+" + $rootScope.patientNum;

          console.log(auname);
          console.log(ato);
          var prescImg=$scope.pic;

					console.log(prescImg);

            var success = function(message)
            {


								console.log('prescription clicked');
								console.log(message);


							$rootScope.prescription = {};


							$rootScope.val = "";

							$rootScope.testVal = "";
							$rootScope.mediVal = "";


						 //
						 //
						// 	console.log(message);
						// 	$ionicHistory.nextViewOptions({
						// 	disableAnimate: true,
						// 	disableBack: true
						//  });

						 //$state.go('templates.consulted_patient',{}, {location: "replace", reload: true});

						 $state.go('templates.consulted_patient');


              // alert(message);
							console.log(message);
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

}


$scope.statename = $ionicHistory.currentStateName();

// console.log($state.statename);
// if($scope.statename =='app.patient_home')
// {
//
//
// 		console.log('unread chat count for android called');
//
//
// 			$scope.unreadchatforpatient = {};
// 				var username = "greet+"+$localStorage.user;
//
// 						var password = "DQ_patient";
//
// 					var success = function(message)
// 					{
// 							$scope.unreadchatforpatient = message;
// 					}
//
// 					var failure = function()
// 					{
// 					 alert("Error calling Hello Plugin");
// 					 //console.log('error');
//
// 					}
//
// 		hello.unreadchatfromusers(username,password,success, failure);
// }


});


///Firebase appraoch of push notification getting token with some service worker error

// var config = {
// 	apiKey: "AIzaSyBPldeHuqE5O3GGqS2jWIkR5s8JKNnfxDE",
// 	authDomain: "doctorquick-158607.firebaseapp.com",
// 	databaseURL: "https://doctorquick-158607.firebaseio.com",
// 	storageBucket: "doctorquick-158607.appspot.com",
// 	messagingSenderId: "271054721857"
// };
// console.log(config);
// firebase.initializeApp(config);
// console.log(firebase.app().name);
//
// // Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();
//
// 	messaging.requestPermission()
// 	.then(function() {
// 	console.log('Notification permission granted.');
//
// 	return messaging.getToken();
// 	})
// 	.then(function(token){
// 		console.log(token);
// 	})
// 	.catch(function(err) {
// 	console.log('Unable to get permission to notify.', err);
// 	});
//
// 	messaging.onMessage(function(payload){
// 		console.log('onMessage',payload);
// 	});
