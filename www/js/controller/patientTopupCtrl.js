
// DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$cordovaInAppBrowser, $http, patientWalletServices) {

DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$cordovaInAppBrowser, $http, patientWalletServices, payu) {

	$rootScope.headerTxt="Topup";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;

  $scope.payment={};
	$scope.payu_params = {};
	patientWalletServices.myWalletBalance($localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });

	$scope.testlink=function(){
		console.log('');
		// window.open('http://bss.greettech.com/DQ/PayUMoney_form.php')
	}



			$scope.payuOrder = function(form) {
							$scope.payu_params = {
											key: "0MQaQP",
											salt: "13p0PXZk",
											//key: "gtKFFx",
											//salt: "eCwWELxi",
											txnid:Math.floor(Math.random() * 100000000000),
											amount:"1",
											productinfo:"test",
											firstname:"amit",
											email:"amit.tantia@gmail.com",
											surl: encodeURI("http://greetbss.greettech.com/DQ/payuSucces.php"), //url needs to be encode
											furl: encodeURI("http://www.doctorquick.com/") // url needs to be encode
							}

							var hash_string = $scope.payu_params.key+"|"+$scope.payu_params.txnid+"|"+$scope.payu_params.amount+"|"+
				 $scope.payu_params.productinfo+"|"+$scope.payu_params.firstname+"|"+
				 $scope.payu_params.email+"|||||||||||"+$scope.payu_params.salt;


										$scope.payu_params.hash = CryptoJS.SHA512(hash_string).toString(CryptoJS.enc.Base64);

										//console.log("Hash = "+$scope.payu_params.hash);

										var payu_params_string = '';
										for (var key in $scope.payu_params)
										{
											payu_params_string += key + "=" + $scope.payu_params[key] + "&";
										}

										payu_params_string = payu_params_string.slice(0,-1);

										var bytes = [];
										for (var i = 0; i < payu_params_string.length; ++i)
										{
												bytes.push(payu_params_string.charCodeAt(i));
										}
										var winURL = "https://secure.payu.in/_payment";
										//var winURL = "https://test.payu.in/_payment";


										// var winURL = "https://test.payu.in/_payment";

										var form = document.createElement("form");
										form.setAttribute("method", "post");
										form.setAttribute("action", winURL);
										form.setAttribute("headers", "Access-Control-Allow-Origin: *");


										for (var i in $scope.payu_params)
										{
												if ($scope.payu_params.hasOwnProperty(i))
												{
														var input = document.createElement('input');
														input.type = 'hidden';
														input.name = i;
														input.value = $scope.payu_params[i];
														form.appendChild(input);
														document.body.appendChild(form);
														form.submit();
														document.body.removeChild(form);
												}
										}
										// var winName = "payu";
										//
										// var windowoption='resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
										//
										// document.body.appendChild(form);
										// 	window.open("winURL", winName,windowoption);
										// 	form.target = winName;
										// 	form.submit();
										// 	document.body.removeChild(form);
						 }

})
