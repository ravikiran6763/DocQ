DoctorQuickApp.service('patientRegistrationService', function ($rootScope, $http,$q, BASE_URL, API)
{

  $rootScope.shareData = function( userDetails )
  {

    console.log(userDetails);
    $scope.sampleFunction( userDetails) ;

  };

  this.patientRegistrationDone = function (patientDetails)
  {


      	var deferred = $q.defer();
    		$http.post(BASE_URL.url + API.patientRegistration,patientDetails)
    		.success(function (data, status, headers, config){

    			deferred.resolve(data);
    		})
    		.error(function (){
    			deferred.reject('Error while getting data');
    		});

    		return deferred.promise;

  };

this.sendotp = function(phoneno)
{

  console.log(phoneno);
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.sendotp,phoneno)
  .success(function (data, status, headers, config){

    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;





}


});
