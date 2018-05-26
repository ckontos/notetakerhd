$(document).ready(function() {

    var noteContainer = $('#notesGoHere');
    // Variable to hold our posts
    var notes;

    var myFirebase = new Firebase('https://notetakerhd-chat.firebaseio.com/');
    var nameInput = $('#sender-name');
    var textInput = $('#new-message-body');
    var sendButton = $('#send-message');

    // Click events for the edit and delete buttons
    $(document).on("click", ".deleteNote", handleNoteDelete);
    $(document).on("click", ".editNote", handleNoteEdit);
    $(document).on("click", ".chatNote", handleChatForm);



    var url = window.location.search;
    var entryId = url.split("=")[1];

    //get all notes from that entry Id as identified by entry ID in url
    getNotes(entryId);

    // This function grabs notes from the database and updates the view
    function getNotes(entry) {
        entryId = entry || "";
        if (entryId) {
            entryId = "/?entry_id=" + entryId;
        }
        $.get("/api/notes" + entryId, function(data) {
            console.log("Notes", data);
            notes = data;
            if (!notes || !notes.length) {
                displayEmpty(entry);
            }
            else {
                initializeRows();
            }
        });
    }

    // InitializeRows handles appending all of our constructed note HTML inside the note container
    function initializeRows() {
        noteContainer.empty();
        var notesToAdd = [];
        for (var i = 0; i < notes.length; i++) {
            notesToAdd.push(createNewRow(notes[i]));
        }
        noteContainer.append(notesToAdd);
        $(document).trigger('appendCompleted');
    }

    // This function constructs a notes HTML
    function createNewRow(note) {
        var newNoteAdd = $('<div>');
        newNoteAdd.data("note", note);
        newNoteAdd.addClass('addedNoteRow');
        newNoteAdd.append(
            "<ul class='collapsible'><li><div class='collapsible-header blue lighten-3 black-text'><i class='material-icons note-title-icon hide-on-small-only'>library_books</i>" + note.title + " | " + note.date + "<span class='right note-buttons'><a class='waves-effect waves-light btn black deleteNote'><i class='material-icons deleteIcon'>close</i></a><a class='waves-effect waves-light btn black editNote'><i class='material-icons editIcon'>edit</i></a><a class='waves-effect waves-light btn black chatNote modal-trigger' href='#modal1'><i class='material-icons chatIcon'>chat_bubble</i></a></span></div><div class='collapsible-body black-text'><span>" + note.body + "</span></div></li></ul>"
        );
        return newNoteAdd;
    }

    // This function figures out which NOTE we want to delete and then calls does and API call to delete and physicvally delete it from the page
    function handleNoteDelete() {
        var confirmNoteDelete = confirm("Delete this note?");
        if (confirmNoteDelete === true) {
            var currentNote = $(this).closest('.addedNoteRow').data("note");
            console.log(currentNote);
            var id = currentNote.id;
            var rowToDelete = $(this).closest('.addedNoteRow');
            $.ajax({
                    method: "DELETE",
                    url: "/api/notes/" + id
                })
                .done(rowToDelete.remove());
        }
        else {
            return;
        }
    }

    // This function figures out which note we want to edit and takes it to the appropriate url
    function handleNoteEdit() {
        var currentNote = $(this).closest('.addedNoteRow').data("note");
        window.location.href = "/cms?note_id=" + currentNote.id;
    }

    // This function displays a messgae when there are no notes
    function displayEmpty() {
        var query = window.location.search;
        noteContainer.empty();
        var messageh4 = $("<h4>");
        messageh4.css({ "text-align": "center", "margin-top": "50px", "font-family": "Caveat Brush, cursive" });
        messageh4.html("No notes yet for this entry! Navigate <a href='/cms" + query +
            "'>here</a> to get started.");
        noteContainer.append(messageh4);
    }

    // function for pre-filling the information in the modal on the chat button press
    function handleChatForm() {
        $.get("/api/user_data", {}, function(data) {

            $('#sender-name').val(data.firstName + " " + data.lastName);
            $('.sender-name-label').addClass('active');
        });

        var currentChatNote = $(this).closest('.addedNoteRow').data("note");
        console.log(currentChatNote);
        console.log(currentChatNote.title);
        console.log(currentChatNote.Entry.title);

        var noteToSend = $('<note>');
        var displayMsg = currentChatNote.Entry.title + ': ' + currentChatNote.title;
        noteToSend.attr("data-title", currentChatNote.title);
        noteToSend.attr("data-body", currentChatNote.body);
        noteToSend.text(displayMsg);
        $('#new-message-body').val($(noteToSend).prop('outerHTML'));
        $('.new-message-label').addClass('active');
        console.log(noteToSend);
    }

    /** Listener for send button to push data into firebase **/
    sendButton.on('click', function() {
        var msgName = nameInput.val().trim();
        var msgText = textInput.val().trim();

        myFirebase.push({ Name: msgName, Text: msgText });
        textInput.val("");
    });
});
