// function delete_people(x) {
//     // let el = x.previousSibling;
//     // el = x;
//     let arr = x.previousSibling.nodeValue.trim().split(/\s+/);
//     console.log(arr[0]);
//     // alert(x.previousSibling);
// }

var app = new Vue({
    el: "#app",
    data: {
        event_active: false,
        sign_up_active: false,
        desc_active: false,
        start_time_input: '',
        end_time_input: '',
        name_input: '',
        desc_input: '',
        item_index: 0,
        delete_index: 0,
        event: [],
        delete_event_active: false,
        calender_active: false,
        list_active: false,
        info_active: false,
        modify_active: true,
        show_detail_active: false,
        // sign_in: false
        people_active: false,
        delete_people_active: false,
        delete_people_index: 0,
    },
    computed: {
        show_detail: function () {
            if (this.show_detail_active === true) {
                if (Object.keys(this.event).length != 0) {
                    return this.event[this.item_index].desc;
                }
            }
        },
        show_time_1: function () {
            if (Object.keys(this.event).length >= 1) {
                return this.event[(this.event).length - 1].start_time;
            }
        },
        show_name_1: function () {
            if (Object.keys(this.event).length >= 1) {
                return this.event[(this.event).length - 1].name;
            }
        },
        show_detail_1: function () {
            if (Object.keys(this.event).length >= 1) {
                return this.event[(this.event).length - 1].desc;
            }
        },
        show_time_2: function () {
            if (Object.keys(this.event).length >= 2) {
                return this.event[(this.event).length - 2].start_time;
            }
        },
        show_name_2: function () {
            if (Object.keys(this.event).length >= 2) {
                return this.event[(this.event).length - 2].name;
            }
        },
        show_detail_2: function () {
            if (Object.keys(this.event).length >= 2) {
                // return this.event[this.item_index].desc;
                return this.event[(this.event).length - 2].desc;
            }
        },
    },
    methods: {
        link_to_sign_in: function () {
            window.location.href = "./public/sign_in.html";
            // let have_logged = document.getElementById("user");
            // if (have_logged.style.display ===)
        },
        add_event: function () {
            this.start_time_input = this.start_time_input.replace("T", " ");
            this.end_time_input = this.end_time_input.replace("T", " ");
            let send_flag = false;

            if (this.event.length === 0) {
                send_flag = true;
            } else {
                for (let i = 0; i < this.event.length; i++) {
                    if ((this.start_time_input >= this.event[i].start_time && this.end_time_input <= this.event[i].end_time) || (this.start_time_input >= this.event[i].start_time && this.start_time_input <= this.event[i].end_time) || (this.end_time_input >= this.event[i].start_time && this.end_time_input <= this.event[i].end_time)) {
                        send_flag = false;
                        alert("The time you entered conflicts with the existing event time, please change the event time");
                        break;
                    } else {
                        send_flag = true;
                    }
                }
            }

            if (send_flag === true) {
                this.event.push({ start_time: this.start_time_input, end_time: this.end_time_input, name: this.name_input, desc: this.desc_input });

                let last_event = { start_time: this.start_time_input, end_time: this.end_time_input, name: this.name_input, desc: this.desc_input };
                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {

                    }
                };

                xhttp.open("POST", "/event", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(last_event));

            }
        },
        delete_event: function () {
            let delete_event = { start_time: this.event[this.delete_index].start_time, end_time: this.event[this.delete_index].end_time, name: this.event[this.delete_index].name };
            this.event.splice(this.delete_index, 1);

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                }
            };

            xhttp.open("POST", "/delete_event", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(delete_event));
        },
        get_information: function () {
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let info = JSON.parse(this.responseText);
                    document.getElementsByClassName("user_info")[0].value = info.Username;
                    document.getElementsByClassName("user_info")[1].value = info.Email;
                    document.getElementsByClassName("user_info")[2].value = info.Password;
                }
            };

            xhttp.open("POST", "/user_information", true);
            // xhttp.setRequestHeader("Content-type", "application/json");
            // xhttp.send(JSON.stringify(user));
            xhttp.send();
        },
        add_people: function () {
            this.people_active = true;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let people = JSON.parse(this.responseText);
                    let size = Object.keys(people).length;

                    let list = `<p class="people_text">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</p>`;
                    for (let i = 0; i < size; i++) {
                        list += `<li class="people_text">${people[i].Username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${people[i].Email}</li>`;
                    }
                    document.getElementsByClassName("people")[0].innerHTML = list;
                }
            };

            xhttp.open("GET", "/people", true);
            // xhttp.setRequestHeader("Content-type", "application/json");
            // xhttp.send(JSON.stringify(user));
            xhttp.send();
        },
        // delete_people: function () {
        //     // console.log(this.delete_people_index);
        //     alert("hello");

        //     // let xhttp = new XMLHttpRequest();

        //     // xhttp.onreadystatechange = function () {
        //     //     if (this.readyState == 4 && this.status == 200) {
        //     //         let people = JSON.parse(this.responseText);
        //     //         let size = Object.keys(people).length;

        //     //         let list = `<p class="people_text">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</p>`;
        //     //         for (let i = 0; i < size; i++) {
        //     //             list += `<li class="people_text">${people[i].Username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${people[i].Email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="delete_people()">Delete</button></li>`;
        //     //         }
        //     //         document.getElementsByClassName("people")[1].innerHTML = list;
        //     //     }
        //     // };

        //     // xhttp.open("POST", "/delete_people", true);
        //     // xhttp.setRequestHeader("Content-type", "application/json");
        //     // xhttp.send(JSON.stringify(delete_user));
        // },
        popup_delete_people: function () {
            this.delete_people_active = true;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let people = JSON.parse(this.responseText);
                    let size = Object.keys(people).length;

                    let list = `<p class="people_text">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</p>`;
                    for (let i = 0; i < size; i++) {
                        list += `<li class="people_text">${people[i].Username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${people[i].Email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="delete_people_index = i" onclick="delete_people(this)"}">Delete</button></li>`;
                    }
                    document.getElementsByClassName("people")[1].innerHTML = list;
                }
            };

            xhttp.open("GET", "/people", true);
            // xhttp.setRequestHeader("Content-type", "application/json");
            // xhttp.send(JSON.stringify(user));
            xhttp.send();
        },
        link_to_calendar: function () {
            window.location.href = "./public/calendar.html";
        }
    }
});

// export default app

function show_hide(input, icon) {
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
    icon.classList.toggle('fa-eye-slash');
}

var main_class = document.querySelector(".main");

main_class.addEventListener("click", event => {
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

// export function redirect() {
//     window.location.href = "../home.html";
//     document.getElementById("log_in").innerText = "Log Out";
//     // app.sign_in = true;
// }

// export var sign_in_flag = false;

// function change_to_log_out() {
//     if (sign_in_flag === true) {
//         document.getElementById("log_in").innerText = "Log Out";
//     }
// }

// var el;
function delete_people(x) {
    // let el = x.previousSibling;
    // el = x;
    let delete_username = x.previousSibling.nodeValue.trim().split(/\s+/)[0];
    let delete_email = x.previousSibling.nodeValue.trim().split(/\s+/)[1];
    // el = x;
    // console.log(el);
    // console.log(arr[0]);
    // alert(x.previousSibling);

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            app.popup_delete_people();
        }
    };

    xhttp.open("POST", "/delete_people", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ username: delete_username, email: delete_email }));
}