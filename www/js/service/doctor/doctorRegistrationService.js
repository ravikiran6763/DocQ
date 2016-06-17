DoctorQuickApp.service('doctorRegistrationService', function ($http,$q, BASE_URL, API) {
//Doctor Registration
this.doctorRegistrationDone = function (doctorDetails) {
  console.log(doctorDetails);
  var deferred = $q.defer();
  console.log(BASE_URL.url + API.doctorRegistration);
  $http.post(BASE_URL.url + API.doctorRegistration,doctorDetails)
  .success(function (data, status, headers, config){
  console.log(data);
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

};

});
