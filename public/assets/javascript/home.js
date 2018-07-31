window.onload = function() {

    $("#send-feedback").on('click', handleFeedbackSubmit);

    function handleFeedbackSubmit(event) {

        var feedbackName = $('#feedback-name').val().trim();
        var feedbackEmail = $('#feedback-email').val().trim();
        var feedbackBody = $('#feedback-body').val().trim();

        event.preventDefault();

        if (!feedbackName || !feedbackEmail || !feedbackBody) {
            alert("Must fill out all of the form!");
            return;
        }

        var newMessage = {
            name: feedbackName,
            email: feedbackEmail,
            message: feedbackBody
        };

        submitMessage(newMessage);

        //empty the form
        $('#feedback-name').val("");
        $('#feedback-email').val("");
        $('#feedback-body').val("");
    }

    function submitMessage(message) {

        $.get("/send", {
                to: "ckontos3@gmail.com",
                subject: "New Message From NoteTakerHD",
                html: "<h3>" + "Name: " + message.name + "</h3>" + "<br>" +
                    "<h4>" + "email: " + message.email + "</h4>" +
                    "<p>" + message.message + "</p>"
            },
            function(data) {
                if (data == "sent") {

                    $('.messageConfirm').html("<p class='green-text'>Message sent!  Thank you for your feedback!<p>");
                    // var confirmDiv = $("<div>");
                    // confirmDiv.addClass('messageConfirm');
                    // $('.messageConfirm').html("<h3 class='green-text'>Message sent!  Thank you for your feedback!</h3>");
                    // confirmDiv.append();
                }
            });
    }
};
