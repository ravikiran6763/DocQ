DoctorQuickApp.controller('patientCareCtrl', function($scope, $rootScope, $localStorage, $ionicConfig, $http, patientCareService) {
	$rootScope.headerTxt="Customer Care";
	$rootScope.showBackBtn=true;
	$rootScope.checkedValue = false;
	$rootScope.cc={};
	$scope.sendQuery=function(){
    var patientQuery={
      patientPhone:$localStorage.user,
      query:$rootScope.cc.query
    }

    patientCareService.submitQuery(patientQuery).then(function(response){
        console.log(response);
        $rootScope.cc.query="";
      }).catch(function(error){
      console.log('failure data', error);
    });

	};

  $scope.requestCallback=function(){
    console.log('callback');
    patientCareService.submitCallBack($localStorage.user).then(function(response){
        console.log(response);
        $rootScope.cc.query="";
      }).catch(function(error){
      console.log('failure data', error);
    });

  };

})
