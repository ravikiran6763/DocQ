'use strict';
DoctorQuickApp.service('myConsultationService', function ($http,$q, BASE_URL, API) {

this.myConsultedDoctors = function (patient_phone) {
console.log(patient_phone);

  var deferred = $q.defer();
  console.log(BASE_URL.url + API.myConsultations);
  $http.post(BASE_URL.url + API.myConsultations,patient_phone)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}

});
