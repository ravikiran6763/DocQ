DoctorQuickApp.controller('doctorCareCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $ionicLoading, $http, $cordovaToast, doctorCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showBadge=false;
	$rootScope.showNotification=false;
	$rootScope.cc={};
	$scope.doctorQuery=function(){

		if(!$rootScope.cc.query){
			console.log($rootScope.cc.query);
			$cordovaToast.showLongCenter('Please Enter your Query', 'short', 'center').then(function(success) {
			// success
console.log('toast should display');

			}, function (error) {
			// error

			console.log(error);
			console.log('toast should display');


			});

		}
		else{
			var doctorQuery={
	      patientPhone:$localStorage.user,
	      query:$rootScope.cc.query
	    }

	    doctorCareService.submitQuery(doctorQuery).then(function(response){
	        console.log(response);
	        $rootScope.cc.query="";
	      }).catch(function(error){
	      console.log('failure data', error);
	    });

		}

	};

  $scope.doctorCallback=function(){
    console.log('callback');
		// $scope.name="ravi";
		$ionicLoading.show({
      // duration: 30000,
      noBackdrop: true,
      template: '<ion-spinner icon="lines"/><p class="item-icon-left">Loading stuff...</p>'
    });
		// $ionicLoading.show({
    //             content: "<div class='loading-text'>" +
    //             "<div class='row'> " +
    //             "<div class='col col-33 loading-thumb-container'>" +
		//
    //             "</div> <div class='col col-66'>" +
    //             "<h4 class='black-text'>" + $scope.name + "</h4>" +
    //             "</div> </div>" +
    //             "</div>",
    //             animation: 'fade-in',
    //             showBackdrop: false,
    //             maxWidth: 200,
    //             showDelay: 500
    //         });
    doctorCareService.submitCallBack($localStorage.user).then(function(response){
        console.log(response);
				$ionicLoading.hide();
        $rootScope.cc.query="";
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})
