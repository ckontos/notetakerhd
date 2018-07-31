$(document).ready(function() {

    var myFirebase = new Firebase('https://notetakerhd-chat.firebaseio.com/');
    var nameInput = $('#sender-name');
    var textInput = $('#new-message-body');
    var sendButton = $('#send-message');
    var entrySelect = $('#msg-entry-select');
    var noteDate = $('#msg-note-date');
    var entryId;

    //initialize the modal dropdown
    $('select').formSelect();

    handleUserNameDisplay();

    /** Function to add a data listener **/
    var startListening = function() {
        myFirebase.on('child_added', function(snapshot) {
            var msg = snapshot.val();

            var msgNameElement = $('<p>');
            msgNameElement.addClass('nameElement');
            msgNameElement.append(msg.Name);

            var msgTextElement = $('<b>');

            if ($(msg.Text).is("note")) {
                var parsedHTML = $.parseHTML(msg.Text);
                var button = $('<a>');
                button.addClass('waves-effect waves-light btn black white-text modal-trigger addNoteFromChat');
                button.html('<div class="addNoteFromChatText">Add Note</div>');
                button.attr('href', '#modal1');
                $(parsedHTML).append(button);
                msgTextElement.append(parsedHTML);
            }
            else {
                msgTextElement.append(msg.Text);
            }

            var msgElement = $('<div class="card-panel blue lighten-3">');
            msgElement.append(msgNameElement);
            msgElement.append(msgTextElement);

            $('#chat').append(msgElement);
        });
    };

    // Begin listening for data
    startListening();

    //calling get entries to fill the select form in modal
    getEntries();

    // A function to get entries and then render our list of entries
    function getEntries() {
        $.get("/api/entries", renderEntryList);
        setTimeout(() => { $('select').formSelect(); }, 350);

    }

    // Function to either render a list of entries, or if there are none, direct the user to the dashboard
    // to create an entry first
    function renderEntryList(data) {

        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createEntryRow(data[i]));
        }
        entrySelect.empty();
        console.log(rowsToAdd);
        console.log(entrySelect);
        entrySelect.append(rowsToAdd);
        entrySelect.val(entryId);
    }

    // Creates the entry options in the dropdown
    function createEntryRow(entry) {
        var listOption = $("<option>");
        listOption.attr("value", entry.id);
        listOption.text(entry.title);
        return listOption;
    }


    $(document).on("click", ".modal-trigger", (event) => {

        var newMsgObject = {
            title: $(event.currentTarget).parent().attr('data-title'),
            body: $(event.currentTarget).parent().attr('data-body')
        };

        $(document).on('click', '#msg-add-note', function() {
            //and here is you dynamially created click handler for the modal with available information from chat

            newMsgObject.date = noteDate.val().trim();
            newMsgObject.EntryId = entrySelect.val();

            submitNote(newMsgObject);
        });
    });

    // Submits a new note and brings user to that particular notes page upon completion
    function submitNote(note) {
        $.post("/api/notes", note, function() {
            var id = note.EntryId;
            window.location.href = "/notes?entry_id=" + id;
        });
    }

    function handleUserNameDisplay() {
        $.get("/api/user_data", {}, function(data) {

            $('.userNameDisplay').append(data.username);
        });
    }

});
