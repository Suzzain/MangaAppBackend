   function logout (token,username) {
       

        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username');
		
         window.location.href = "./login.html"

         

    }