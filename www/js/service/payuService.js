'use strict';
DoctorQuickApp.service('payuService', function ($http,$q, BASE_URL, API) {

  this.payuCall  = function (payu_params) {
    console.log('from service',payu_params);
    // var deferred = $q.defer();
    // console.log(BASE_URL.url + API.getMyDoctorRatings);
    // $http.post(BASE_URL.url + API.getMyDoctorRatings,myDocratedValues)
    // .success(function (data, status, headers, config){
    //   deferred.resolve(data);
    // })
    // .error(function (){
    //   deferred.reject('Error while getting data');
    // });
    //
    // return deferred.promise;

  }



});
