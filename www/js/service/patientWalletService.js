'use strict';
DoctorQuickApp.service('patientWalletServices', function ($cookies,$http,$q, BASE_URL, API) {

  this.myWalletBalance = function (patientPhone) {
      console.log('wallet Service:',patientPhone);
    var deferred = $q.defer();

    $http.post(BASE_URL.url + API.myWalletBalance,patientPhone)
    .success(function (data, status, headers, config){
      deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('Error while getting data');
    });

    return deferred.promise;

  }

  // //transaction history
  // this.mytransactionHistory = function (patientPhone) {
  //     console.log('transaction history of:',patientPhone);
  //
  //
  // }


});
