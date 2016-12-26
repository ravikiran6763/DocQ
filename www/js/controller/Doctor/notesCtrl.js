
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,$cordovaFile) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;




console.log($rootScope.chekMedi);

	$rootScope.notes = {
			checkedDiagnosis : false,
			checkedTests : false,
			checkedMedication : false
		};
    console.log($rootScope.pphno);
		$scope.patientfname = $rootScope.pfname;
		$scope.patientlname = $rootScope.plname;
    $scope.prequestedtime = $rootScope.requesteddatetime;
    $scope.paphno = $rootScope.pphno;

    console.log($scope.patientfname);
		// console.log($scope.paphno);

$scope.sendprescription = function()
{
    $scope.diagnosis = testresultbydoctor.getdiagnosis();
    $scope.tests = testresultbydoctor.gettests();
    $scope.medication = testresultbydoctor.getmedication();

    if($scope.notes.checkedDiagnosis && $scope.notes.checkedMedication && $scope.notes.checkedTests)
    {
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      $scope.tests = testresultbydoctor.gettests();
      $scope.medication = testresultbydoctor.getmedication();
      var allresultschecked = {
        diagnosis : $scope.diagnosis,
        tests : $scope.tests,
        medication : $scope.medication
      }

      console.log(allresultschecked);
    }
    else if($scope.notes.checkedDiagnosis && $scope.notes.checkedTests)
    {
        alert('You Missed Medication');
        $scope.diagnosis = testresultbydoctor.getdiagnosis();
        $scope.tests = testresultbydoctor.gettests();
        var diagandtests = {
          diagnosis : $scope.diagnosis,
          tests : $scope.tests
        }
        console.log(diagandtests);
    }
    else if($scope.notes.checkedDiagnosis && $scope.notes.checkedMedication)
    {
      alert('You Missed Tests');
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      $scope.medication = testresultbydoctor.getmedication();
      var diagandmedication = {
      diagnosis : $scope.diagnosis,
      medication : $scope.medication
      }
      console.log(diagandmedication);
    }
    else if($scope.notes.checkedTests && $scope.notes.checkedMedication)
    {
      alert('You Missed Diagnosis');
      $scope.tests = testresultbydoctor.gettests();
      $scope.medication = testresultbydoctor.getmedication();
      var testsandmedication = {
      tests : $scope.tests,
      medication : $scope.medication
      }
      console.log(testsandmedication);
    }
    else if($scope.notes.checkedDiagnosis)
    {
      alert('You have Missed tests and Medication');
      $scope.diagnosis = testresultbydoctor.getdiagnosis();
      var onlydiagnosis = {
      diagnosis : $scope.diagnosis
      }
      console.log(onlydiagnosis);
    }
    else if($scope.notes.checkedTests)
    {
      alert('You have Missed Diagnosis and Medication');
      $scope.tests = testresultbydoctor.gettests();
      var onlytests = {
      tests : $scope.tests
      }
      console.log(onlytests);
    }
    else if($scope.notes.checkedMedication)
    {
      alert('You have Missed Diagnosis and Tests');
      $scope.medication = testresultbydoctor.getmedication();
      var onlymedication = {
      medication : $scope.medication
      }
      console.log(onlymedication);
    }
    else
    {
      console.log('Please Select Atleast One Tests')
    }

    if($scope.notes.checkedDiagnosis || $scope.notes.checkedTests || $scope.notes.checkedMedication)
    {
        var prescriptiondetails = {
          docphno : $localStorage.user,
          patientphno : $rootScope.pphno,
          diagnosis : $scope.diagnosis,
          tests : $scope.tests,
          medication : $scope.medication
        };


        //test jpeg image response
        testresultbydoctor.jpegtest(prescriptiondetails).then(function(response){
        // console.log(response);
        $scope.pic=response
        console.log(prescriptiondetails);

        if($scope.pic){
          var auname =  "greet+"+$localStorage.user;
          var apw = "DQ_doctor";
          var ato = "greet+" + $rootScope.pphno;

          console.log(auname);
          console.log(ato);
          var prescImg=$scope.pic;

            var success = function(message)
            {
              console.log(message);
            }

            var failure = function()
            {
              console.log("Error calling Hello Plugin");
            }

            hello.automatic(auname,apw,ato,prescImg,success, failure);


          }
        // $rootScope.prescription = "data:image/jpeg;base64," + $scope.pic;
        // var URL = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
        // console.log(cordova.file.externalRootDirectory);
        }).catch(function(error){
        console.log('failure data', error);
        });

    }
    // console.log(URL);
}

})
