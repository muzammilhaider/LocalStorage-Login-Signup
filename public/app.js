const createAccount = () => {
    let name        = document.getElementById('userName');
    let email       = document.getElementById('userEmail');
    let phone       = document.getElementById('userPhone');
    let password    = document.getElementById('userPassword');
    let regex       =/^([a-zA-Z0-9\-\_\.]{3,16})+\@+([a-zA-Z]{4,7})+\.+([a-zA-Z]{2,3})$/;
    let error       = false;
    let signupAlert = document.getElementById('signup-alert')
    if(name.value.length < 4){
        document.getElementById('name-error').innerHTML = "Please enter name";
        document.getElementById('name-error').style.color = "red";
        error = true;
    }
    if(name.value.match(/[^a-z ]/gi)){
        document.getElementById('name-error').innerHTML = "Invalid input";
        document.getElementById('name-error').style.color = "red";
        error = true;
    }
    if(name.value.length >= 4){
        document.getElementById('name-error').innerHTML = "";
    }
    if(email.value.length < 4){
        document.getElementById('email-error').innerHTML = "Please enter email";
        document.getElementById('email-error').style.color = "red";
        error = true;
    }
    if(phone.value.length == ""){
        document.getElementById('phone-error').innerHTML = "Please enter phone number";
        document.getElementById('phone-error').style.color = "red";
        error = true;
    }
    if(phone.value.length != 11 && phone.value.length != ""){
        document.getElementById('phone-error').innerHTML = "Please enter correct phone number";
        document.getElementById('phone-error').style.color = "red";
        error = true;
    }
    if(phone.value.length == 11){
        document.getElementById('phone-error').innerHTML = "";
    }
    if(password.value.length < 4){
        document.getElementById('pass-error').innerHTML = "Please enter password";
        document.getElementById('pass-error').style.color = "red";
        error = true;
    }
    if(regex.test(email.value) == false && email.value.length >= 4){
        document.getElementById('email-error').innerHTML = "Please enter correct email";
        document.getElementById('email-error').style.color = "red";
        error = true;
    }
    if(email.value.length >=4 && regex.test(email.value) == true){
        document.getElementById('email-error').innerHTML = "";
    }
    if(password.value.length >= 4){
        document.getElementById('pass-error').innerHTML = "";
    }
    if(!error){
        const userObj = {
            username : name.value,
            email : email.value,
            pass : password.value,
        }
        const user = JSON.parse(localStorage.getItem('users')) || []
        const userIndex = user.findIndex((val,indx)=>{
            return val.email == userObj.email;
        })
        if(userIndex == -1){
            user.push(userObj)
            localStorage.setItem('users',JSON.stringify(user))
            name.value = "";
            email.value = "";
            phone.value = "";
            password.value = "";
            signupAlert.classList.remove('d-none');
            signupAlert.innerHTML = "Your account has been created.";
            setTimeout(function(){
                signupAlert.classList.add('d-none');
            },4000)
        } else{
            signupAlert.classList.remove('d-none');
            signupAlert.classList.remove('alert-success');
            signupAlert.classList.add('alert-danger');
            signupAlert.innerHTML = "Email already exist";
            setTimeout(function(){
                signupAlert.classList.add('d-none');
            },4000)
        }
    }
}

const login = () => {
    let email      = document.getElementById('email');
    let password   = document.getElementById('password');
    let regex      =/^([a-zA-Z0-9\-\_\.]{3,16})+\@+([a-zA-Z]{4,7})+\.+([a-zA-Z]{2,3})$/;
    let error      = false;
    let loginAlert = document.getElementById('login-alert')
    if(email.value.length < 4){
        document.getElementById('error-email').innerHTML = "Please enter email";
        document.getElementById('error-email').style.color = "red";
        error = true;
    }
    if(password.value.length < 4){
        document.getElementById('error-pass').innerHTML = "Please enter password";
        document.getElementById('error-pass').style.color = "red";
        error = true;
    }
    if(regex.test(email.value) == false && email.value.length >= 4){
        document.getElementById('error-email').innerHTML = "Please enter correct email";
        document.getElementById('error-email').style.color = "red";
        error = true;
    }
    if(email.value.length >=4 && regex.test(email.value) == true){
        document.getElementById('error-email').innerHTML = "";
    }
    if(password.value.length >= 4){
        document.getElementById('error-pass').innerHTML = "";
    }
    if(!error){
        const userData = JSON.parse(localStorage.getItem('users'))
        if(userData){
            const checkUser = userData.find((val,indx)=>{
                return val.email == email.value && val.pass == password.value
            })
            if(checkUser ){
                const userObj = {
                    email : email.value,
                    pass : password.value,
                }
                localStorage.setItem('loginUser',JSON.stringify(userObj))
                window.location.assign('./dashboard.html');
            } else{
                loginAlert.classList.remove('d-none');
                loginAlert.classList.remove('alert-success');
                loginAlert.classList.add('alert-danger');
                loginAlert.innerHTML = "Credentials do not match";
                setTimeout(function(){
                    loginAlert.classList.add('d-none');
                },4000)
            }
        } else{
            loginAlert.classList.remove('d-none');
                loginAlert.classList.remove('alert-success');
                loginAlert.classList.add('alert-danger');
                loginAlert.innerHTML = "Credentials do not match";
                setTimeout(function(){
                    loginAlert.classList.add('d-none');
                },4000)
        }
    }
}

const showData = () => {
    let email = document.getElementById('email');
    let u_email = document.getElementById('u_email');
    let u_pass = document.getElementById('u_pass');
    let data = JSON.parse(localStorage.getItem("loginUser"))
    u_email.innerHTML = data.email
    email.innerHTML = data.email
    u_pass.innerHTML = data.pass
}

const showPass = (input) => {
    let input1 = input.previousElementSibling.previousElementSibling;
    if(input1.type == "text"){
        input1.type = "password";
    }else{
        input1.type = "text";
    }
}

const logout = () => {
    localStorage.removeItem('loginUser');
    window.location.replace("./index.html");
}