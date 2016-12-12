DoctorQuickApp.service('invitereviews', function ($http,$q) {


var con = [];

this.invitereviewpatient = function (listofcontacts) {

      con.push(listofcontacts);



}


this.getinvitecontacts = function()
{

  
    return con;


}


});
