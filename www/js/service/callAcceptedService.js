'use strict';
DoctorQuickApp.service('callAcceptedService', function ($http,$q, BASE_URL, API) {

  this.callDeclined = function (patientQuery){
    console.log('from service',patientQuery);
    var deferred = $q.defer();
    $http.post(BASE_URL.url + API.callDecline,patientQuery)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });
    return deferred.promise;
  }




})
