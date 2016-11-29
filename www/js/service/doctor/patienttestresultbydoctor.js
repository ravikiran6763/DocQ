DoctorQuickApp.service('testresultbydoctor', function ($http,$q, $rootScope, BASE_URL, API, $cordovaFileTransfer,$cordovaFile) {
    var diagnosisbydoctor = "";
    var testsbydoctor = "";
    var medicationbydoctor = "";
    var diagnosis = "";
    var tests = "";
    var medication = "";

  this.diagnosisdone = function(diagnosis)
  {
      diagnosisbydoctor = diagnosis;
  }

  this.testrecommended = function(tests)
  {
    testsbydoctor = tests;
  }

  this.medicationdone = function(medication)
  {
      medicationbydoctor = medication;
  }

  this.getdiagnosis = function()
  {
      if(diagnosisbydoctor)
      {
            return diagnosisbydoctor;
      }
      else
      {
          return "";
      }

      //return diagnosisbydoctor;
  }

  this.gettests = function()
  {

    if(testsbydoctor)
    {
          return testsbydoctor;
    }
    else
    {
          return "";
    }

      //return testsbydoctor;
  }

  this.getmedication = function()
  {
    if(medicationbydoctor)
    {

          return medicationbydoctor;

    }
    else
    {

          return "";


    }
        //return medicationbydoctor;

  }

  this.jpegtest = function(options)
  {
    console.log(options);


    console.log(options.docphno);
    console.log(options.patientphno);



        var auname =  "greet+"+options.docphno;
        var apw = "DQ_doctor";



        var ato = "greet+" + options.patientphno;

        // var auname = "veereshkolkur@gmail.com";
        // var apw = "sangamma";

      //var ato = "ravikiran6763@gmail.com";

      console.log(auname);
      console.log(ato);

          var success = function(message)
          {
            alert(message);
          }

          var failure = function()
          {
            alert("Error calling Hello Plugin");
          }

          hello.automatic(auname,apw,ato,success, failure);



    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.testjpegimage,options)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
      $rootScope.getImage = function(data){
        return 'data:image/jpeg;base64,' + data;
        console.log('data:image/jpeg;base64,' + data);
      }

    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;



    //
    // $scope.doctorphoneno = options.docphno;
    // $scope.patientphoneno = options.patientphno;






  }
});


// if(status == 200)
// {
//   //create folder in SD card ad DQIMAGES  Directory
//   $cordovaFile.createDir(cordova.file.externalRootDirectory, "DoctorQuick", true)
//   .then(function (success) {
//   console.log("Folder created" + success);
//   }, function (error) {
//   console.log("Folder not created." + error);
//   });
// //Download jpeg file as patient name from this url and store it in DQIMAGES Folder
//   var url = "http://ec2-54-187-148-143.us-west-2.compute.amazonaws.com/prescription/out.jpeg";
//   var filename = url.split("/").pop();
//
//    var targetPath = cordova.file.externalRootDirectory + "DoctorQuick/" + filename;
//       $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
//           console.log('Success');
//           console.log(result);
//       }, function (error) {
//           console.log('Error');
//       }, function (progress) {
//           // PROGRESS HANDLING GOES HERE
//       });
// }
