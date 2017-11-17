DoctorQuickApp.controller('editPatientCtrl', function($state, $scope,$stateParams, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage,$filter, LoginService,ionicDatePicker, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Edit Patient";
  $rootScope.hideSideMenu = true;

  $localStorage.newPatientVal=0;
  console.log($localStorage.newPatientVal);

  var ipObj2 = {
      callback: function (val) {  //Mandatory
        console.log('Selected To Date : ' + val, new Date(val));
        $rootScope.toDate = $filter('date')(new Date(val),'yyyy-MM-dd');

      },

      from: new Date(2016, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      // disableWeekdays: [0],       //Optional
      closeOnSelect: true,
      dateFormat: 'dd MMMM yyyy',     //Optional
      templateType: 'popup'       //Optional
    };

  $scope.openDatePickerTo = function(){
    ionicDatePicker.openDatePicker(ipObj2);
  };

  $rootScope.savePatient=function(){

  }

})
