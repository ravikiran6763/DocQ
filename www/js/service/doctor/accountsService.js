'use strict';
DoctorQuickApp.service('accountsService', function ($http,$q, BASE_URL, API,$rootScope) {


//  var userPhone;
//
	this.docAccountsDetails = function () {
    var docAccDetails={
      fromDate :$rootScope.from,
      toDate:$rootScope.toDate
    }

    if($rootScope.from && $rootScope.toDate){
      // alert('get details')
      console.log('from Service',docAccDetails);
      var deferred = $q.defer();
      // console.log(BASE_URL.url + API.docAccDetails);
  		$http.post(BASE_URL.url + API.docAccDetails,docAccDetails)
  		.success(function (data, status, headers, config){
        console.log(data);
  			deferred.resolve(data);
  		})
  		.error(function (){
  			deferred.reject('Error while getting data');
  		});
  		return deferred.promise;
    }

}
this.returnUserPhone=function(){
  return userPhone;
}

});
