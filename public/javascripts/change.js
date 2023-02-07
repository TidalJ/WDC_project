export var sign_in_flag = false;

function change_to_log_out() {
    if (sign_in_flag === true) {
        document.getElementById("log_in").innerText = "Log Out";
    }
}