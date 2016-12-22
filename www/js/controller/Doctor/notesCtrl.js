
DoctorQuickApp.controller('notesCtrl', function($scope,$rootScope,$localStorage,$ionicConfig,$cordovaCamera,testresultbydoctor,$cordovaFileTransfer,$cordovaFile) {

  $scope.toggle = true;
	$rootScope.headerTxt="Notes";
	$rootScope.showBackBtn=true;
	$rootScope.showNotification=false;
	$rootScope.showBadge=false;

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
      alert('Please Select Atleast One Tests')
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

        if($scope.pic){
          console.log('start download here');
          var remoteFile = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
          var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);

          console.log(remoteFile);
          console.log(localFileName);

//
//create folder in SD card ad DQIMAGES  Directory
        $cordovaFile.createDir(cordova.file.externalRootDirectory, "DoctorQuick", true)
        .then(function (success) {
        console.log("Folder created" + success);
        }, function (error) {
        console.log("Folder not created." + error);
        });
        //Download jpeg file as patient name from this url and store it in DQIMAGES Folder
        var url = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
        var filename = url.split("/").pop();

        var targetPath = cordova.file.externalRootDirectory + "DoctorQuick/" + filename;
        $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
            console.log('Success');
            console.log(result);
        }, function (error) {
            console.log('Error');
        }, function (progress) {
            // PROGRESS HANDLING GOES HERE
        });
//

    }
        $rootScope.prescription = "data:image/jpeg;base64," + $scope.pic;
        var URL = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
        // console.log(cordova.file.externalRootDirectory);
        }).catch(function(error){
        console.log('failure data', error);
        });

    }
    console.log(URL);
}

})
