// on click func for logging in
$(document).ready(function () {

    $("#login").on("click", function (event) {
        event.preventDefault();
        var username = $("#username").val().trim();
        var password = $("#password").val().trim();
        console.log("Inside login button");
        getUser(username, password)
    })

    function getUser(username, password) {
        $.get("/api/" + username + "/" + password, function (data) {
            console.log(data)
            uniqueUserId = data.id;

            $.ajax("/login/" + uniqueUserId, {
                type: "GET"
            }).then(function(result){
                console.log(login);
            })

            window.location = "/" + uniqueUserId;
        })
    }

    $("#signup").on("click", function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var username = $("#newUsername").val().trim();
        var password = $("#newPassword").val().trim();
        createNewUser({
            email: email,
            username: username,
            password: password
        })
    })

    // Logging out
    $("#logout").on("click", function () {
        console.log("Inside logout button");
        // login = false;
        $.ajax("/logout", {
            type: "GET"
        }).then(function(result){
            console.log(login);
        })
        
    })

    function createNewUser(userData) {
        $.post("/api/new/user", userData)
            .then(console.log(userData))
    }
})



