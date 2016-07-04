DoctorQuickApp.service('testresultbydoctor', function ($http,$q, BASE_URL, API) {


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

      return diagnosisbydoctor;

  }

  this.gettests = function()
  {

      return testsbydoctor;


  }

  this.getmedication = function()
  {

        return medicationbydoctor;

  }

  this.jpegtest = function()
  {



    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.testjpegimage)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
      console.log(data);

    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;



  }




});
