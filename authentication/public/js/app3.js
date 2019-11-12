// on click func for logging in
$(document).ready(function () {

    $("#login").on("click", function (event) {
        event.preventDefualt();
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        getUser(username, password)
    })

    function getUser(username, password) {
        $.get("/api/" + username + "/" + password, function (data) {
            uniqueUserId = data.id;
            window.location = "/" + uniqueUserId;
        })
    }

    $("#signup").on("click", function (event) {
        event.preventDefualt();
        var email = $("#email").val().trim();
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        createNewUser({
            email: email,
            username: username,
            password: password
        })
    })

    function createNewUser(userData) {
        $.post("/api/new/user", userData)
            .then(console.log("created new user"))
    }

})
