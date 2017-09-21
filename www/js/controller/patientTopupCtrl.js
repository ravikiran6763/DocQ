DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$state,$localStorage, $location, $ionicConfig,$cordovaInAppBrowser, $http, $cordovaToast, patientWalletServices, RazorPayService ,patientProfileDetailsService,BASE_URL, API) {

	$rootScope.headerTxt="Topup";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;

	$scope.paymentid= "";

	// if (StatusBar.isVisible) {
	//     // do something
	// 		alert('statusbar shown');
	// }

	$scope.validateTopup=function(isDocTopUpValid){
	  console.log('isDocTopUpValid ', isDocTopUpValid);
	  console.log('clicked');

	  $scope.topUp = true;
	  if(isDocTopUpValid) {
	    // console.log('isDocFormValid ', isDocFormValid)

								$scope.payment.topUpAmt=($scope.payment.topUp*100);
								console.log($scope.payment.topUp);
							 if($scope.payment.topUp < 250){
								 window.plugins.toast.showWithOptions({
								 message: "amount must be ₹250 or higher.",
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
									// alert('amount must be ₹250 or higher');
									// $cordovaToast.showLongCenter('amount must be ₹250 or higher.', 'short', 'center').then(function(success) {
									// // success
									// }, function (error) {
									// // error
									// });
								}

								else{
									var options = {
											description: 'Consult A Doctor Now',
											currency: 'INR',
											key: 'rzp_test_mzUbTyUmUd2dyE',//change this key to live account key
											amount:$scope.payment.topUpAmt ,
											name: 'DoctorQuick',
											method:{
												wallet:false
											},
											prefill: {
												email: $scope.patientEmail,
												contact: $localStorage.user,
												name: $scope.patientFname
											},
											// theme: {color: '#6aa13e'}
									}
									// console.log(options);
									RazorPayService.topUpOptions(options);
									var successCallback = function(payment_id) {
									// alert('payment_id: ' + payment_id);

									$scope.paymentid = payment_id;
										RazorPayService.topUp($scope.paymentid).then(function(response){
									   $rootScope.patientWalletUpdate=response;
										//  alert($rootScope.patientWalletUpdate);
										 if($rootScope.patientWalletUpdate=='TransactionSuccessful'){
											  // $state.go('app.patient_topup');
												$state.go("app.patient_payments", $stateParams, {reload: true, inherit: false});
										 }
										 if($rootScope.patientWalletUpdate=='ERROR'){
											  alert('Error While Initiating Payment');
										 }
										 $scope.payment.topUpAmt="";
										 $window.location.reload(true);
										//  $state.reload()
										// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
									 console.log($rootScope.patientWalletUpdate);
									   }).catch(function(error){
									     console.log('failure data', error);
									   });
									}

									var cancelCallback = function(error) {
									alert(error.description + ' (Error '+error.code+')');
									}
									RazorpayCheckout.open(options, successCallback, cancelCallback);

								}
	  }
		else{
			window.plugins.toast.showWithOptions({
			message: "amount must be ₹250 or higher.",
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
			// $cordovaToast.showLongCenter('amount must be ₹250 or higher.', 'short', 'center').then(function(success) {
			// // success
			// }, function (error) {
			// // error
			// });
		}
	}


  $scope.payment={};
	$scope.payu_params = {};
	patientWalletServices.myWalletBalance($localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

//RAZORPAY DETAILS

//key id:rzp_test_mzUbTyUmUd2dyE
//Key secret :Ocof0Yf9Ms36q8Pq7EtE2zUd
// https://rzp_test_mzUbTyUmUd2dyE:Ocof0Yf9Ms36q8Pq7EtE2zUd@api.razorpay.com/v1/payments

$scope.patient_details=[];
	 patientProfileDetailsService.fetchPatient($localStorage.user).then(function(response){
		$scope.patient_details=response;
		console.log($scope.patient_details);
		var data=$scope.patient_details//take all json data into this variable
		 var totList=[];
				for(var i=0; i<data.length; i++){

						$scope.patientFname=data[i].patientFname,
						$scope.patientEmail=data[i].patientEmail,

				console.log($scope.patientFname);
				console.log($scope.patientEmail);

				}

 }).catch(function(error){
 console.log('failure data', error);
 })

 patientWalletServices.paidToDoctors($localStorage.user).then(function(response){
	$rootScope.doctorsList=response;
	console.log($rootScope.doctorsList);
	}).catch(function(error){
		console.log('failure data', error);
	});
})
