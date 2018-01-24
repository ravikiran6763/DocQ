DoctorQuickApp.controller('editPatientCtrl', function($state, $scope,$stateParams,  $cordovaDatePicker, $rootScope, $ionicConfig, $ionicPopup,$http,$localStorage, $ionicSideMenuDelegate, $localStorage,$filter, LoginService, medicalSpecialityService) {
  $scope.toggle = true;
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;
  $rootScope.headerTxt="Edit Patient";
  $rootScope.hideSideMenu = true;

  $localStorage.newPatientVal=0;
  console.log($localStorage.newPatientVal);
  $rootScope.dateOfBirth='';
  var ipObj2 = {
      callback: function (val) {  //Mandatory
        $scope.currentDate = new Date();
        console.log($scope.currentDate);
        console.log('Selected To Date : ' + val, new Date(val));

    $rootScope.editPatient.newPatientDOB = $filter('date')(new Date(val),'yyyy-MM-dd');

      },

      from: new Date(1950, 1, 1), //Optional
      to: new Date(2050, 12, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: false,          //Optional
      // disableWeekdays: [0],       //Optional
      closeOnSelect: true,
      dateFormat: 'dd MMMM yyyy',     //Optional
      templateType: 'popup'       //Optional
    };


    var options = {
       date: new Date(),
       mode: 'date', // or 'time'
       // minDate: new Date() - 10000,
       // allowOldDates: true,
       allowFutureDates: false,
       androidTheme : 3,
       cancelButtonLabel: 'CANCEL',
       cancelButtonColor: '#ff0101',
       doneButtonLabel: 'DONE',
       doneButtonColor: '#6aa13e'

     };

  $scope.openDatePickerDOB = function(){

    $cordovaDatePicker.show(options).then(function(date){
      $rootScope.dateOfBirth=date;
            console.log(date);
            $rootScope.editPatient.newPatientDOB =date;

        });


    // ionicDatePicker.openDatePicker(ipObj2);
  };

  $rootScope.editNewPatient=function(newdata){
    console.log(newdata.newPatientDOB);
    console.log("save patient");
    medicalSpecialityService.editNewPatient(newdata).then(function(response){
       console.log('saved', response);
       $state.go("app.subPatientList");
       $rootScope.newPatient={};
    }).catch(function(error){
        console.log('failure data', error);
    });
  }

})
