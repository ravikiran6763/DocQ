
DoctorQuickApp.controller('patientCareCtrl', function($scope, $rootScope, $timeout, $localStorage, $cordovaToast, $ionicLoading, $ionicConfig, $http, patientCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
	$rootScope.cc={};

	$scope.sendQuery=function(){
		if(!$rootScope.cc.query){
			console.log('$rootScope.cc.query');
			$cordovaToast.showLongCenter('Please Enter your Query', 'short', 'center').then(function(success) {
			// success
			}, function (error) {
			// error
			});

		}
		else{
			var patientQuery={
	      patientPhone:$localStorage.user,
	      query:$rootScope.cc.query
	    }

	    patientCareService.submitQuery(patientQuery).then(function(response){

	        $rootScope.cc.query="";
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
				$ionicLoading.show({
		      duration: 60000,
		      noBackdrop: true,
		      template: '<i circular-progress class="ion-android-call" style="position: absolute;margin: 30px 0 0 36px; font-size: 19vw;"></i><circular-progress value="100" max="100" orientation="1" radius="50" stroke="10" base-color="#e2e2e2"  progress-color="#00745f" iterations="700" animation="easeInOutCubic" ></circular-progress>'
		    });
				$timeout(function () {
				console.log('timeout');
				$ionicLoading.hide();
				}, 10000);
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
