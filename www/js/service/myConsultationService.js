'use strict';
DoctorQuickApp.service('myConsultationService', function ($http,$q, BASE_URL, API) {

this.myConsultedDoctors = function (patient_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.myConsultations);
  $http.post(BASE_URL.url + API.myConsultations,patient_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

this.docSummaryDetails = function (doc_phone) {
<<<<<<< HEAD
=======





>>>>>>> 2f8b0ba99affb070b45ce7c7e341614fa49cee88
console.log(doc_phone);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.docSummary);
  $http.post(BASE_URL.url + API.docSummary,doc_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

//for doctors consultationDetails


this.myConsultedPatients = function (doctor_phone) {
// console.log(patient_phone);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.myConsultedPatients);
  $http.post(BASE_URL.url + API.myConsultedPatients,doctor_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


});
