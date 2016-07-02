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




});
