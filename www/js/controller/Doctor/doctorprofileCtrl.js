DoctorQuickApp.controller('doctorprofileCtrl', function($scope, $state, $stateParams, $ionicPopup,$ionicHistory, $timeout, $interval, $rootScope, $cordovaNetwork, $window,$localStorage, $ionicLoading,callacceptedbydoctor,doctorServices,patientrequesttodoctor,searchDoctorServices) {

$rootScope.headerTxt="Doctor Profile";
$rootScope.showBackBtn=true;
$rootScope.checkedValue = false;
$rootScope.docPhone = $localStorage.docPhone;

console.log($rootScope.docPhone);
console.log('docprofileview');

$rootScope.docRates=$stateParams.rates;
$rootScope.docTotalRates=$stateParams.totalRates;

$scope.getStars = function(rating) {
  // Get the value
  var val = parseFloat(rating);
  // Turn value into number/100
  var size = val/5*100;
  return size + '%';
}


$ionicLoading.show();
$interval(checkDocStatus, 6000);

doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
$scope.myDocDetails1=response;
console.log('doc',$scope.myDocDetails1);
var data=$scope.myDocDetails1;//take all json data into this variable
  for(var i=0; i<data.length; i++){

        $rootScope.rates=data[i].ratings,
        $rootScope.totalRates=data[i].ratingCount

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

        console.log('doc',$rootScope.DocRates);

        $scope.ratings = [{
               current: $rootScope.DocRates,
               max: 5,
               total:$rootScope.totalRates
             }, ];
    }
}).catch(function(error){
console.log('failure data', error);
});

     console.log($scope.ratings.current);
function checkDocStatus(){
  doctorServices.myDoctorsDetails($localStorage.docPhone).then(function(response){
  $scope.myDocDetails1=response;
  var data=$scope.myDocDetails1;//take all json data into this variable
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



      }


  }).catch(function(error){
  console.log('failure data', error);
  });
}



doctorServices.myDoctorsFetched($localStorage.user).then(function(response){
    $scope.myConsultedDoctors=response;
    $ionicLoading.hide();
  }).catch(function(error){
console.log('failure data', error);
});

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

          // hello.greet(uname,pw,persontocall,success, failure);


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
//for voice call
$scope.BalanceForVoiceCall=function()
{
  $ionicLoading.show();
  doctorServices.checkMyBalance($localStorage.user).then(function(response){
    // console.log(response[0][0]);
    $scope.myBalance=response[0][0];
    var uname = "greet+"+$localStorage.user;
     var pw = "DQ_patient";

     //var persontocall = "greet+" + $localStorage.docPhone;
     var persontocall = "greet+" + $localStorage.consultedDoctor;
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

    doctorServices.myDoctorsDetails($localStorage.consultedDoctor).then(function(response){
    $scope.myDocDetails=response;
    }).catch(function(error){
    console.log('failure data', error);
    });

    $scope.updateDocPwd=function(){
      $rootScope.ratedBy=$scope.login.userPhone;
      console.log('dddd');
      // var newPwd={
      // newPwd1:$scope.login.password,
      // userPhone:$localStorage.user
      // };
      // console.log(newPwd);
      // patientProfileDetailsService.changePwd2(newPwd)
      // .then(function(response){
      // console.log(response);
      //
      // }).catch(function(error){
      // console.log('failure data', error);
      // });

    }
    // $scope.sendOfflineRequest=function()
    // {
    //   patientrequesttodoctor.sendOfflineMessage($localStorage.user).then(function(response)
    //   {
    //     $scope.otp=response;
    //     console.log($scope.otp);
    //   }).catch(function(error)
    //   {
    //     console.log('failure data', error);
    //   });
    //
    // }
    $scope.sendOfflineMessage=function(num){
  		var sendMessage={
  			patient:$localStorage.user,
  			doctor:num
  		}
      console.log(sendMessage);
  		searchDoctorServices.sendOfflineMessage(sendMessage).then(function(response){
  			console.log(response);
  		}).catch(function(error){
  		console.log('failure data', error);
  		});
  	}


    $interval(checkMyCallStatus,2000,false);

  	function checkMyCallStatus(){
  		searchDoctorServices.checkCallStatus($localStorage.myCallId).then(function(response){
  			console.log($localStorage.myCallId);
  		$scope.myCalStat = response;
  		console.log($scope.myCalStat[0][0]);
  		$localStorage.myCallStatus=$scope.myCalStat[0][0];
  		$scope.checkMyStatus=$localStorage.myCallStatus;
  		})
  	}
  	$scope.$watch('checkMyStatus', function (newValue, oldValue, scope){
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
  								  searchDoctorServices.declineOne2oneReqPatient($localStorage.myCallId).then(function(response){
  								  $scope.declinedByPat=response;
  									$localStorage.myCallId=0;
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
  												callacceptedbydoctor.accpeteddoctor($localStorage.user,$rootScope.docNumToCall,videocallflag,$scope.startdate,$scope.enddate,$localStorage.myCallId).then(function(response){
  													console.log('inserted to consultation',response);

                            $state.go('app.patient_summary',{calledDoctor:$rootScope.docNumToCall,consultId:$localStorage.myCallId}, {location: "replace", reload: false});


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

  	},true);



    $scope.videoCallMydoc=function(num)
    {
      $rootScope.docNumToCall = num;

      var callRequest={
      patient:$localStorage.user,
      doctor:$rootScope.docNumToCall,
      // callId:$rootScope.callId
      }
      console.log(callRequest);
      doctorServices.checkMyBalance($localStorage.user).then(function(response){
        console.log(response);
        console.log(response[0][0]);
      $scope.myBalance=response[0][0];
      $localStorage.patientWalletBalance=$scope.myBalance;
          console.log('pop up page clicked');
            var uname = "greet+"+$localStorage.user;
             var pw = "DQ_patient";

             var persontocall = "greet+" + $rootScope.docNumToCall;
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
              $localStorage.myCallId = $rootScope.one2oneReq.reqId;

              console.log($localStorage.myCallId);
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
              searchDoctorServices.cancelOne2oneReq($localStorage.myCallId).then(function(response){
              $scope.cancelledReq=response;
              $localStorage.myCallId=0;
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
                  searchDoctorServices.cancelOne2oneReq($localStorage.myCallId).then(function(response){
                  $scope.cancelledReq=response;
                  $localStorage.myCallId=0;
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
