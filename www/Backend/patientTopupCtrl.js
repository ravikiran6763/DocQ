DoctorQuickApp.controller('patientTopupCtrl', function($scope,$rootScope,$state,$localStorage, $location, $ionicConfig,$cordovaInAppBrowser, $http, patientWalletServices, payu,patientProfileDetailsService,BASE_URL, API) {

	$rootScope.headerTxt="Topup";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

  $scope.payment={};
	$scope.payu_params = {};
	patientWalletServices.myWalletBalance($localStorage.user).then(function(response){
   $rootScope.patientWalletdetails=response;
   console.log($rootScope.patientWalletdetails);
   }).catch(function(error){
     console.log('failure data', error);
   });



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

			// CardName: Any name
			// CardNumber: 5123456789012346
			// CVV: 123
			// Expiry: May 2017
// console.log($location.path());
			// console.log(FailureURI);
			var FailureURI=BASE_URL.url + API.payuFailure;
			// var FailureURI=$location.path();
console.log(FailureURI);
			var payuSucces=BASE_URL.url + API.payuSucces;
			// Global InAppBrowser reference

			var iabRef = null;

			$scope.payuOrder = function(form) {
			  // var FailureURI=$state.go("app.patient_home");
			  // console.log($scope.payment.topUp);

			        $scope.payu_params = {
			                key: "0MQaQP",
			                salt: "13p0PXZk",
			                // key: "gtKFFx",//test keys
			                // salt: "eCwWELxi",//test salt
			                txnid:Math.floor(Math.random() * 100000000000),
			                amount:$scope.payment.topUp,
			                productinfo:"DoctorQuickWalletBalance",
			                firstname:$scope.patientFname,
			                email:$scope.patientEmail,
			                surl: encodeURI(payuSucces), //url needs to be encode
			                furl: encodeURI(FailureURI), // url needs to be encode
			                if(furl){
			                  alert('hello');
			                }

			                // furl: encodeURI("http://www.doctorquick.com/") // url needs to be encode
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
			              // var winURL = "https://test.payu.in/_payment";
			              // var winURL = "https://test.payu.in/_payment";

			              var form = document.createElement("form");
			              form.setAttribute("method", "post");
			              form.setAttribute("action", winURL);
			              form.setAttribute("headers", "Access-Control-Allow-Origin: *");

			              // console.log($scope.payu_params);

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
			                        // console.log(input);
			                  }
			              }
										// var options = {
										// 		location: 'no',
										// 		clearcache: 'yes',
										// 		toolbar: 'no'
										// 	};
										// $cordovaInAppBrowser.open(winURL, '_blank', options)
				            //   .then(function(event) {
				            //       $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
				            //         // insert form on loaded window
				            //             document.body.appendChild(form);
				            //             form.submit();
				            //             document.body.removeChild(form);
				            //       });
										//
				            //   })
				            //   .catch(function(event) {
				            //     // error
				            //   });
			       }



})
