$(document).ready(function() {

    var emailInput = $("#userEmail");
    var passwordInput = $("#userPassword");

    // When the user clicks to submit the form we need to make sure that there is a password and email entered.
    $("#loginTheUser").on("click", function() {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If both inputs exist, we run the login function using the user's email and password and clear the input fields.
        loginUser(userData.email, userData.password);
        $("#userEmail").val("");
        $("#userPassword").val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the main page
    function loginUser(email, password) {
        console.log("Email and Password: " + email + " " + password);
        $.post("/api/login", {
            email: email,
            password: password
        }).done(function(data) {
            window.location.href = '/dashboard';
            //log an error if it exists
        }).catch(function(error) {
            console.log(error);
        });
    }
});
