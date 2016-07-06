'use strict';
DoctorQuickApp.service('doctorServices', function ($http,$q, BASE_URL, API) {

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

//mydoctors function
this.myDoctorsFetched = function (userPhone) {
  // console.log(userPhone);
  var deferred = $q.defer();
  // console.log(BASE_URL.url + API.fetchMyDoctors);
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
console.log(mydocPhone);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.fetchSpecificDoctor);
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
  console.log(myNumber);
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


});
