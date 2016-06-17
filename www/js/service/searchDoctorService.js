'use strict';
DoctorQuickApp.service('searchDoctorServices', function ($http,$q, BASE_URL, API) {

this.specialitySearch = function (speciality) {
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.getMedicalSpecialist,speciality)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}
//function to fetch all the Doctors

this.fetchAllDoctors = function () {
  console.log('function called to fetch doctors');
  var deferred = $q.defer();
  $http.post(BASE_URL.url + API.fetchAllDoctors)
  .success(function (data, status, headers, config){
    deferred.resolve(data);
  })
  .error(function (){
    deferred.reject('Error while getting data');
  });

  return deferred.promise;

}


// 
// var resultofsearch;


    // // sdidemenu list php file
    // this.searchData = function (sidemenu)
    // {
    //
    //     resultofsearch = sidemenu.spec;
    //     console.log(resultofsearch);
    //
    // };

    // this.getSearchData = function()
    // {
    //
    //   return resultofsearch;
    //   console.log("hello");
    //
    // };

var tags = [
         { "text": "Tag1" },
         { "text": "Tag2" },
         { "text": "Tag3" },
         { "text": "Tag4" },
         { "text": "Tag5" },
         { "text": "Tag6" },
         { "text": "Tag7" },
         { "text": "Tag8" },
         { "text": "Tag9" },
         { "text": "Tag10" }
       ];

 this.load = function() {
   var deferred = $q.defer();
   deferred.resolve(tags);
   return deferred.promise;
 };

});
