$(document).ready(function() {

	 $('#register').submit(function(event){
	 	// $('#lform').hide();
	 	event.preventDefault();
		console.log('register button clicked');
	 	var myFormData = {
	 		username: $('#username').val(),
	 		password: $('#password').val(),
	 		usertype: 'user'
	 		
		 } 
		 console.log(myFormData);
	 	
$.ajax({
//v1 is the version and users is the route in api.
	url:'http://localhost:8080/registers',
	method:'POST',
	contentType: 'application/json',
	data: JSON.stringify(myFormData),
	dataType: 'json',

	sucess:function(result,status){
		console.log(result);
		console.log(status);
		console.log('kamehameha');
	},

	error:function(jqXHR,status){
		console.log(jqXHR)
		console.log('finalflash')
	
	}
});

	 }) 


$('#loginForm').submit(function(event){
	event.preventDefault();
	console.log('login button clicked');
	var myFormData = {
		username : $('#username').val(),
		password : $('#password').val()
	}

$.ajax({

		url:'http://localhost:8080/verify',
		method : 'POST',
		contentType: 'application/json',
		//headers: {'authorization':'Bearer'+window.localStorage.getItem('token')},
		data: JSON.stringify(myFormData),
		dataType: 'json',
		
		success : function(result,status){
				// console.log(result);
				// console.log(status);
					window.localStorage.setItem('token', result.token);
					window.localStorage.setItem('username', result.result.username);
					window.localStorage.setItem('usertype', result.result.usertype);

					$('#message').html(result.message);
					if (result.result.usertype == "user") {
						window.location.href = "index.html"

					}

},
				error : function (jqXHR,status){ 
				console.log(jqXHR, response.JSON.message);
				// 	console.log(jqXHR.responseJSON.message);
				$('#message').html(jqXHR.responseJSON.message);

				}

			})
})
})