DoctorQuickApp.controller('searchDoctorsController', function($scope,$window,$interval,$ionicHistory, $ionicConfig,$timeout, $state,$rootScope, $ionicSideMenuDelegate,$localStorage, $ionicLoading, $ionicPopup, searchDoctorServices,doctorServices, searchbyspecialities,callacceptedbydoctor,$ionicHistory) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	console.log('Search controller called');


	$scope.audioCall=function(num)
	{
		console.log('user:',$localStorage.user);
		$rootScope.docNumToCall=num;
	  $ionicLoading.show();
	  doctorServices.checkMyBalance($localStorage.user).then(function(response){
	    // console.log(response[0][0]);
			$rootScope.patientWalletdetails=response;
			$rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
			$rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

			$rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;
	    if($rootScope.myWalletBal >= 250)
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
					title: 'DoctorQuick',
 				 template: '<b><center>Your DoctorQuick Balance is too low.</center></b>',
 				 cssClass: 'videoPopup',
 				 scope: $scope,
 				 buttons: [
 					 {
 						 text: 'Cancel',
 						 type: 'button-royal',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_home',{}, {location: "replace", reload: false})
 						 }
 					 },
 					 {
 						 text: 'Topup',
 						 type: 'button-positive',
 						 onTap: function(e) {
 							 $ionicHistory.nextViewOptions({
 								 disableAnimate: true,
 								 disableBack: true
 							 });
 							 $state.go('app.patient_topup',{}, {location: "replace", reload: false});
 						 }
 					 },

 				 ]
	      });
	    }
	      $ionicLoading.hide();
	    }).catch(function(error){
	  console.log('failure data', error);
	  });

	}




	function checkCallStatus(){
		searchDoctorServices.checkCallStatus($localStorage.one2oneId).then(function(response){
			console.log($localStorage.one2oneId);
		$scope.calStat = response;
		console.log($scope.calStat[0][0]);
		$localStorage.callStatus=$scope.calStat[0][0];
		$scope.checkStatus=$localStorage.callStatus;
		})
	}
	$scope.$watch('checkStatus', function (newValue, oldValue, scope){
		 console.log('changed');

		 if(newValue == 2){
			 console.log('changed call val');
			 $scope.callReqPopUp.close();
			 setTimeout(function (){
						console.log('delay 3 sec');
					}, 3000);
					console.log('value changed');

					$scope.callAccept = $ionicPopup.show({
				 			 template: "<div >Doctor has accepted your invitation for a<br>consultation. Please start the<br>consultation or decline</div>",
				 			 cssClass: 'requestPopup',
				 			 scope: $scope,
				 			 buttons: [
				 			 {
				 			 text: 'Decline',
				 			 type: 'button-royal',
				 			 onTap:function(){
				 				 console.log('cancel');
				 				 console.log($localStorage.user);
								 $interval.cancel(checkCallStatus);
								 $scope.callReqPopUp.close();
								  searchDoctorServices.declineOne2oneReqPatient($localStorage.one2oneId).then(function(response){
								  $scope.declinedByPat=response;
									$localStorage.one2oneId=0;
									$localStorage.callStatus=0;
									console.log($scope.declinedByPat);
								  }).catch(function(error){
								  	console.log('failure data', error);
								  });
									$state.go($state.current, {}, {reload: true});
				 			 }
				 			 },
							 {
							  text: 'Start',
							  type: 'button-assertive',
							  onTap:function(){
									var videocallflag = 2;
									$scope.startdate = new Date();
									$scope.callid = $rootScope.callId;
									// $localStorage.ViewDoc=1;
									$interval.cancel(checkCallStatus);
									console.log($localStorage.networkType);
									var uname = "greet+"+$localStorage.user;
									var pw = "DQ_patient";

										 var persontocall = "greet+" + $rootScope.docNumToCall;
										 console.log(uname);
										 console.log(persontocall);

									if($localStorage.networkType == 'None')
									{
										var confirmPopup = $ionicPopup.confirm({
														title: 'DoctorQuick',
														template: 'You are Offline ',
														cssClass: 'videoPopup',
														scope: $scope,
														buttons: [
															{
																text: 'Ok',
																type: 'button-royal',
																onTap: function(e) {
																console.log('offline');
																}
															},
														]
													});
									}
									else if($localStorage.networkType == 'Unknown' || $localStorage.networkType == 'Ethernet' || $localStorage.networkType == '2G' || $localStorage.networkType == '3G')
									{
										var confirmPopup = $ionicPopup.confirm({
														title: 'DoctorQuick',
														template: 'We detected slow nwtwork on your device ',
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
									}
									else if($localStorage.networkType == '4G' || $localStorage.networkType == 'WiFi')
									{
										var success = function(message)
										{

												$ionicHistory.nextViewOptions({
												disableAnimate: true,
												disableBack: true
											 });

												//
												$scope.enddate = new Date();
												console.log($localStorage.user);
												console.log($rootScope.accptdDoc);
												// console.log($localStorage.Doctocall);
												callacceptedbydoctor.accpeteddoctor($localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,$localStorage.one2oneId).then(function(response){
													console.log('inserted to consultation',response);

													$state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:$localStorage.one2oneId}, {location: "replace", reload: false});


					              }).catch(function(error){
					              console.log('failure data', error);
					              });
										}
										var failure = function()
										{
											alert("Error calling Hello Plugin");
										}
											hello.greet(uname,pw,persontocall,success, failure);
									}
									else{

										//Do nNothing

									}


							  }
							  },
				 		 ]

				 		 });
		 }
		 if(newValue == 4){
			 alert('declined by doctor');
			 $scope.callAccept.close();
			 var confirmPopup = $ionicPopup.confirm({
							 title: 'Declined!!',
							 template: 'Doctor has declined for consultation',
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
		 }

	},true);
	$scope.videoCall=function(num)
	{

		$interval(checkCallStatus,2000);

		$rootScope.docNumToCall = num;
		$ionicLoading.show();
		var callRequest={
		patient:$localStorage.user,
		doctor:$rootScope.docNumToCall,
		// callId:$rootScope.callId
		}
		console.log(callRequest);
		doctorServices.checkMyBalance($localStorage.user).then(function(response){
			$rootScope.patientWalletdetails=response;
      $rootScope.myCredit=$rootScope.patientWalletdetails[0][0];
      $rootScope.myDebit=$rootScope.patientWalletdetails[0][1];

      $rootScope.myWalletBal=$rootScope.myCredit-$rootScope.myDebit;

			console.log($rootScope.myWalletBal);

						$scope.counter = 0;
			if($rootScope.myWalletBal >= 250)
			{

					searchDoctorServices.requestForCall(callRequest).then(function(response){
						console.log('print response',response);
					window.localStorage['one2oneReq'] = angular.toJson(response);
					$rootScope.one2oneReq = angular.fromJson($window.localStorage['one2oneReq']);
					$localStorage.one2oneId = $rootScope.one2oneReq.reqId;
					console.log($localStorage.one2oneId);
					console.log($rootScope.one2oneReq.callStatus);

				}).catch(function(error){
				console.log('failure data', error);
				});

				// hello.greet(uname,pw,persontocall,success, failure);
				$scope.counter = 120;
        $scope.onTimeout = function(){
          console.log($scope.counter);
          $scope.counter--;
          patientTimeout = $timeout($scope.onTimeout,1000);
          if($scope.counter == 0){
          console.log('one minute over');
          $rootScope.buttonText='Send Request';
          $timeout.cancel(patientTimeout);

          var noResponsePopup = $ionicPopup.alert({
          template: "<div ><p>Doctor did not accepted your request .</p></div>",
          cssClass: 'requestPopup',
          scope: $scope,
          });

          noResponsePopup.then(function(res) {
						console.log('delete request here');
						searchDoctorServices.cancelOne2oneReq($localStorage.one2oneId).then(function(response){
						$scope.cancelledReq=response;
						$localStorage.one2oneId=0;
						$localStorage.callStatus=0;
						console.log($scope.cancelledReq);
						}).catch(function(error){
							console.log('failure data', error);
						});
          });

          $scope.callReqPopUp.close();

          }
        }
				var patientTimeout = $timeout($scope.onTimeout,1000);//timer interval
	      $scope.$on('$destroy', function(){
	      $timeout.cancel(patientTimeout);
	      console.log('destroyed');
	      });
				$scope.callReqPopUp = $ionicPopup.show({
			 			 template: "<div >Your request for a<br>video call has been sent<br><b>{{counter | secondsToDateTime | date:'mm:ss'}}</b></div>",
			 			 cssClass: 'requestPopup',
			 			 scope: $scope,
			 			 buttons: [
			 			 {
			 			 text: 'Cancel',
			 			 type: 'button-royal',
			 			 onTap:function(){
			 				 console.log('cancel');
			 				 console.log($scope.counter);
			 				 console.log($localStorage.user);
							 $scope.callReqPopUp.close();
							  $state.go($state.current, {}, {reload: true});
							  searchDoctorServices.cancelOne2oneReq($localStorage.one2oneId).then(function(response){
							  $scope.cancelledReq=response;
								$localStorage.one2oneId=0;
								$localStorage.callStatus=0;
								console.log($scope.cancelledReq);
							  }).catch(function(error){
							  	console.log('failure data', error);
							  });

			 			 }
			 			 },

			 		 ]

			 		 });

			}
			else
			{

				var confirmPopup = $ionicPopup.confirm({
					title: 'DoctorQuick',
					template: '<b><center>Your DoctorQuick Balance is too low.</center></b>',
					cssClass: 'videoPopup',
					scope: $scope,
					buttons: [
						{
							text: 'Cancel',
							type: 'button-royal',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_home',{}, {location: "replace", reload: false})
							}
						},
						{
							text: 'Topup',
							type: 'button-positive',
							onTap: function(e) {
								$ionicHistory.nextViewOptions({
									disableAnimate: true,
									disableBack: true
								});
								$state.go('app.patient_topup',{}, {location: "replace", reload: false});
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

	$scope.sendOfflineMessage=function(num){
		var sendMessage={
			patient:$localStorage.user,
			doctor:num
		}
		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
			console.log(response);
		}).catch(function(error){
		console.log('failure data', error);
		});
	}


})
