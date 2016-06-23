DoctorQuickApp.service('invitereviews', function ($http,$q, BASE_URL, API) {


var con = {};


this.invitereviewpatient = function (listofcontacts) {


    console.log(listofcontacts);
      con = listofcontacts;
      

};


this.getinvitecontacts = function()
{
  console.log(con);
  return con;


}


});
