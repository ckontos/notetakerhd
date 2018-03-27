window.onload = function() {
    // click handler for sending the form whe the register button is clicked
    $("#registerTheUser").on("click", handleSubmitForm);

    function handleSubmitForm(event) {
        var firstName = $("#newUserFirstName").val().trim();
        var lastName = $("#newUserLastName").val().trim();
        var email = $("#newUserEmail").val().trim();
        var username = $("#newUserUsername").val().trim();
        var password = $("#newUserPassword").val().trim();

        //constructing a new user
        var newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password
        };

        event.preventDefault();
        //dont sumbit unless the form is complete
        if (!password || !email || !firstName || !lastName || !username) {
            return;
        }

        submitToApi(newUser);


        $("#newUserFirstName").val("");
        $("#newUserLastName").val("");
        $("#newUserEmail").val("");
        $("#newUserUsername").val("");
        $("#newUserPassword").val("");
    }

    function submitToApi(user) {
        console.log("about to create user");
        $.post("/api/users", user, function(data, err) {

            console.log(JSON.stringify(data));
            console.log(JSON.stringify(err));
            if (err != "success") {
                console.log(err);
            }
            else {
                window.location.href = '/login';
            }
            // If there's an error, handle it by throwing up an alert
        }).catch(handleErr);
    }



    // function to handle errors
    function handleErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
};
