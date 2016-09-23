DoctorQuickApp.controller('patientCareCtrl', function($scope, $rootScope, $localStorage, $cordovaToast, $ionicLoading, $ionicConfig, $http, patientCareService) {
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
		$ionicLoading.show({
      duration: 30000,
      noBackdrop: true,
      template: '<ion-spinner/><p class="item-icon-left">Loading stuff...</p>'
    });
    patientCareService.submitCallBack($localStorage.user).then(function(response){
        console.log(response);
				console.log(response === 'Query Submitted');
				if(response){
					$ionicLoading.hide();
				}
        $rootScope.cc.query="";
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})
