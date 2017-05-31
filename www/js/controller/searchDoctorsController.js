DoctorQuickApp.controller('searchDoctorsController', function($scope,$window,$interval, $ionicConfig,$timeout, $state,$rootScope, $ionicSideMenuDelegate,$localStorage, $ionicLoading, $ionicPopup, searchDoctorServices,doctorServices, searchbyspecialities) {

	$rootScope.headerTxt="Search Doctors";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

	console.log('Search controller called');


	$scope.audioCall=function(num)
	{
		console.log('user:',$localStorage.user);
		$scope.docNumToCall=num;
	  $ionicLoading.show();
	  doctorServices.checkMyBalance($localStorage.user).then(function(response){
	    // console.log(response[0][0]);
	    $scope.myBalance=response[0][0];
	    var uname = "greet+"+$localStorage.user;
	     var pw = "DQ_patient";

	     var persontocall = "greet+" + $scope.docNumToCall;
			 console.log(persontocall);
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


	$interval(checkCallStatus,2000,false);

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
								 $scope.callReqPopUp.close();
								 	$localStorage.one2oneId=0;
		 							$localStorage.callStatus=0;
								  $state.go($state.current, {}, {reload: true});
								  searchDoctorServices.declineOne2oneReqPatient($localStorage.one2oneId).then(function(response){
								  $scope.declinedByPat=response;
									$localStorage.one2oneId=0;
									$localStorage.callStatus=0;
									console.log($scope.declinedByPat);
								  }).catch(function(error){
								  	console.log('failure data', error);
								  });

				 			 }
				 			 },
							 {
							  text: 'Start',
							  type: 'button-assertive',
							  onTap:function(){
								//  console.log('resend');
								//  $scope.videoCall();

							  }
							  },
				 		 ]

				 		 });
		 }

	},true);
	$scope.videoCall=function(num)
	{
		$scope.docNumToCall = num;

		$ionicLoading.show();
		var callRequest={
		patient:$localStorage.user,
		doctor:$scope.docNumToCall,
		// callId:$rootScope.callId
		}
		console.log(callRequest);
		doctorServices.checkMyBalance($localStorage.user).then(function(response){
			console.log(response[0][0]);
		$scope.myBalance=response[0][0];
		$localStorage.patientWalletBalance=$scope.myBalance;
				console.log('pop up page clicked');
					var uname = "greet+"+$localStorage.user;
					 var pw = "DQ_patient";

					 var persontocall = "greet+" + $scope.docNumToCall;
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

						$scope.counter = 0;
			if($scope.myBalance >= 250)
			{

					searchDoctorServices.requestForCall(callRequest).then(function(response){
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
						//  {
						 //  text: 'Resend',
						 //  type: 'button-assertive',
						 //  onTap:function(){
						// 	 console.log('resend');
						// 	 $scope.videoCall();
						 //
						 //  }
						 //  },
			 		 ]

			 		 });

			}
			else
			{

				var confirmPopup = $ionicPopup.confirm({
					template: '<b><center>Your DoctorQuick Balance is too low.</center></b>',
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

})
