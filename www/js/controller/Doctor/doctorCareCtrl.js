DoctorQuickApp.controller('doctorCareCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $http, doctorCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.showBadge=false;
	$rootScope.cc={};
	$scope.doctorQuery=function(){
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

	};

  $scope.doctorCallback=function(){
    console.log('callback');
    doctorCareService.submitCallBack($localStorage.user).then(function(response){
        console.log(response);
        $rootScope.cc.query="";
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})
