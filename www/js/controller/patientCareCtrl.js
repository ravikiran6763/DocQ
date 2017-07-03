
DoctorQuickApp.controller('patientCareCtrl', function($scope, $rootScope, $timeout, $localStorage, $cordovaToast, $ionicLoading, $ionicPopup,$ionicConfig, $http, patientCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.hideSideMenu = true;
	$rootScope.showBadge=false;
	$rootScope.cc={};
$scope.submitted = false;
	$scope.sendQuery=function(isQueryValid){
		console.log(isQueryValid);
		$scope.submitted = true;
		console.log($scope.submitted);
		if(!$rootScope.cc.query){
			console.log($rootScope.cc.query);
			$scope.queryPopup =$ionicPopup.show({
	     template: 'Please Enter your query',
			 cssClass: 'dqAlerts',
			 scope: $scope,
	   	});
			$timeout(function() {
		     $scope.queryPopup.close(); //close the popup after 3 seconds for some reason
		  }, 1000);
		}
		else{
			var patientQuery={
	      patientPhone:$localStorage.user,
	      query:$rootScope.cc.query
	    }
	    patientCareService.submitQuery(patientQuery).then(function(response){
	        $rootScope.cc.query="";

					window.plugins.toast.showWithOptions({
        message: "Your query has been submitted.",
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


	      }).catch(function(error){
	      console.log('failure data', error);
	    });
		}

	};

  $scope.requestCallback=function(){
    console.log('callback');

		patientCareService.submitCallBack($localStorage.user).then(function(response){
			console.log('check network connection here');
			console.log(response );
			if(response === 'Query Submitted'){
				$ionicLoading.show();

				$timeout(function () {
				console.log('timeout');
				$ionicLoading.hide();

				window.plugins.toast.showWithOptions({
			message: "Someone will contact you from DoctorQuick.",
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



			}, 5000);

			}
			else{
				alert('check ur this thing');
			}
			$rootScope.cc.query="";
		}).catch(function(error){
		console.log('failure data', error);
		});

  };
})

// $ionicLoading.show({
//   duration: 60000,
//   noBackdrop: true,
//   template: '<i circular-progress class="ion-android-call" style="position: absolute;margin: 30px 0 0 36px; font-size: 19vw;"></i><circular-progress value="100" max="100" orientation="1" radius="50" stroke="10" base-color="#e2e2e2"  progress-color="#00745f" iterations="700" animation="easeInOutCubic" ></circular-progress>'
// });
