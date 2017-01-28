'use strict';
DoctorQuickApp.service('doctorServices', function ($http,$q,$localStorage, BASE_URL, API) {

this.doctorDetails = function (docPhone) {
  var deferred = $q.defer();
  console.log(docPhone);
  $http.post(BASE_URL.url + API.doctorDetails,docPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.fetchReqPatientDetails = function(detail){
  // console.log(detail);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.reqPatientDetails);
  $http.post(BASE_URL.url + API.reqPatientDetails,detail)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;
}

//mydoctors function
this.myDoctorsFetched = function (userPhone){
//console.log(userPhone);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchMyDoctors,userPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myDoctorsDetails = function (mydocPhone) {

  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchSpecificDoctor);
  $http.post(BASE_URL.url + API.fetchSpecificDoctor,mydocPhone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;
}

this.myConsultedPatients = function (meDoc) {
  console.log(meDoc);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myConsultedPatients,meDoc)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.checkMyBalance = function (myNumber) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.myWalletBalance,myNumber)
  .success(function (data, status, headers, config){
    deferred.resolve(data);

  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


this.changeDocPwd = function(newPwd){

  var deferred = $q.defer();
  console.log(BASE_URL.url + API.updateDocPassword);
  $http.post(BASE_URL.url + API.updateDocPassword,newPwd)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.cancelByDoc = function(consultId){

  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.cancelByDoc,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

this.patientActivity = function(consultId){
  var deferred = $q.defer();

  $http.post(BASE_URL.url + API.patientActivity,consultId)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });
  return deferred.promise;

}

});
