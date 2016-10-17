DoctorQuickApp.controller('patientRefundCtrl', function($scope,$rootScope,$ionicConfig,$ionicPopup, $stateParams, $cordovaToast, $http) {
	$rootScope.headerTxt="Refund ";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

	$rootScope.credit = $stateParams.credit;
	$rootScope.debit = $stateParams.debit;
	$scope.payment={};
	$rootScope.balanceAmt=$rootScope.credit-$rootScope.debit;

console.log('refundCtrl');

if($rootScope.debit===''){
	console.log('null');
}
console.log($rootScope.debit);
	$scope.refundReq = function(isDocTopUpValid) {
		console.log('isDocTopUpValid ', isDocTopUpValid)
		$scope.submitted = true;
		
		if(!$scope.payment.refund){

			$cordovaToast.showLongCenter('amount must be entered.', 'short', 'center').then(function(success) {
			// success
			}, function (error) {
			// error
			});

		}
		else if ($scope.payment.refund>$rootScope.balanceAmt) {

						$cordovaToast.showLongCenter('Amount more than available balance.', 'short', 'center').then(function(success) {
						// success
						}, function (error) {
						// error
						});

		}
		else{

			var confirmPopup = $ionicPopup.confirm({
			 // title: '<h4>Thank You</h4>',
				template: 'Your request for refund is processed and it will be added to your account number within 7 business days..'
			});
		}



	   };

})
