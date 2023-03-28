// import app from '/home.js'

// import {sign_in_flag} from '/change.js';

var container = document.getElementById('container1');

function active() {
    container.classList.add('right-panel-active');
}

function remove() {
    container.classList.remove('right-panel-active');
}

var all_psw = document.querySelector(".container1");

function show_hide(input, icon) {
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
    icon.classList.toggle('fa-eye-slash');
}

container.addEventListener("click", event => {
    if (event.target.matches(".fa-eye")) {
        let icon_elm = event.target;
        let input_elm = icon_elm.previousElementSibling;
        show_hide(input_elm, icon_elm);
    }
});

var psw = document.getElementById("psw");
var confirm_psw = document.getElementById("confirm_psw");

function verify_password() {
    if (psw.value != confirm_psw.value) {
        confirm_psw.setCustomValidity("Password don't match");
    } else {
        confirm_psw.setCustomValidity('');
    }
}

psw.onchange = verify_password;
confirm_psw.onkeyup = verify_password;

function redirect() {
    window.location.href = "./public/sign_in.html";
    // document.getElementById("log_in").innerText = "Log Out";
    // sign_in_flag = true;
    // app.sign_in = true;

}

// sign in
function sign_in() {
    let user = {
        username: document.getElementsByName("username")[1].value,
        password: document.getElementsByName("password")[1].value
    };

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirect();
            // alert("Sign in success");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Sign in fail");
        }
    };

    xhttp.open("POST", "/sign_in");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirect();
            // alert("Sign in success");
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Sign in fail");
        }
    };

    xhttp.open("POST", "/google_sign_in");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));
}

// sign up
function sign_up() {

    let user = {
        username: document.getElementsByName('username')[0].value,
        email: document.getElementsByName('email')[0].value,
        password: document.getElementsByName('password')[0].value
    };

    if (user.username === '') {
        alert("Please enter your Username");
        return;
    } else if (user.email === '') {
        alert("Please enter your Email");
        return;
    } else if (user.password === '') {
        alert("Please enter your Password");
        return;
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            redirect();
            // alert("Signup Successful");
        } else if (this.readyState == 4 && this.status == 409) {
            alert("The Username already exists, please change your Username.");
        }
    };

    xhttp.open("POST", "/sign_up");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(user));

}