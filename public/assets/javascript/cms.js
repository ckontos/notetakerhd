$(document).ready(function() {

    var titleInput = $('#newNoteTitle');
    var dateInput = $('#newNoteDate');
    var entrySelect = $('#entrySelect');
    var bodyInput = $('#newNoteBody');
    var cmsForm = $("#cms");


    // Adding an event listener for when the form is submitted
    $('#addNotesBtn').on("click", handleFormSubmit);

    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var noteId;
    var entryId;
    // Sets a flag for whether or not we're updating a note to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the note id from the url
    // In '?note_id=1', noteId is 1
    if (url.indexOf("?note_id=") !== -1) {
        noteId = url.split("=")[1];
        getNoteData(noteId, 'note');
    }
    // Otherwise if we have an entry_id in our url, preset the entry select box to be our entry
    else if (url.indexOf("?entry_id=") !== -1) {
        entryId = url.split("=")[1];
    }

    //getting the entries, and their notes
    getEntries();

    function handleFormSubmit(event) {
        event.preventDefault();
        //dont submit unless all the parts of the form are completed
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !dateInput.val() || !entrySelect.val()) {
            alert("Please fill out all of the form!");
            return;
        }

        //constructing the new note object to add hand to the database
        var newNote = {
            title: titleInput.val().trim(),
            date: dateInput.val(),
            body: bodyInput.val().trim(),
            EntryId: entrySelect.val()
        };

        // If we're updating a note run updateNote to update a note
        // Otherwise run submitNote to create a whole new note
        if (updating) {
            newNote.id = noteId;
            updateNote(newNote);
        }
        else {
            submitNote(newNote);
        }
    }

    // Submits a new note and brings user to dashboard (to particular notes eventually) page upon completion
    function submitNote(note) {
        $.post("/api/notes", note, function() {
            var id = note.EntryId;
            window.location.href = "/notes?entry_id=" + id;
        });
    }

    // Gets note data for the current note if we're editing, or if we're adding to an entries existing notes
    function getNoteData(id, type) {
        var queryUrl;
        switch (type) {
            case "note":
                queryUrl = "/api/notes/" + id;
                break;
            case "entry":
                queryUrl = "/api/entries/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                $("label").addClass('active');
                // If this note exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                dateInput.val(data.date);
                entryId = data.EntryId || data.id;
                // If we have a note with this id, set a flag for us to know to update the note
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get entries and then render our list of entries
    function getEntries() {
        $.get("/api/entries", renderEntryList);
        setTimeout(() => { $('select').formSelect(); }, 350);

    }

    // Function to either render a list of entries, or if there are none, direct the user to the dashboard
    // to create an entry first
    function renderEntryList(data) {
        if (!data.length) {
            window.location.href = "/dashboard";
        }

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

    function updateNote(note) {
        $.ajax({
                method: "PUT",
                url: "/api/notes",
                data: note
            })
            .done(function() {
                var id = note.EntryId;
                window.location.href = "/notes?entry_id=" + id;
            });
    }


});
