var token = window.localStorage.getItem('token')
absentToken(token);

function absentToken(token){
    if(!token){
        window.location.href="../login.html"
    }
}