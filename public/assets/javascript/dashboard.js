$(document).ready(function() {

    //Rest of page Code
    var titleInput = $('#newEntryTitle');
    var entryContainer = $('.entry-container'); //white inner card
    var entryList = $('.entriesGoHere'); //div where entries are dynamically added

    //event listeners for submitting new entry and deleting one.
    $('#addEntryBtn').on("click", handleEntrySubmit);
    $(document).on("click", ".delete-entry", handleDeleteEntryPress);
    handleuserNameDisplay();

    // Initially, getting all the entrys
    getEntries();

    //function for what happens when you press the add entry button
    function handleEntrySubmit(event) {
        event.preventDefault();
        //dont do anything if the form isint filled
        if (!titleInput.val().trim().trim()) {
            return;
        }

        upsertEntry({
            title: titleInput.val().trim()
        });
    }

    //function for creating new entry
    function upsertEntry(entryData) {
        $.post("/api/entries", entryData)
            .then(getEntries);
    }

    function createEntry(entryData) {
        var newEr = $("<div>");
        newEr.addClass("addedRow");
        newEr.data("entry", entryData);
        newEr.append(
            "<div class='row'><div class='col s12'><div class='card-panel blue lighten-3 eachEntryPanel'><h5 class='black-text entryInfo entryItem'>" + entryData.title + "</h5><div class='fixed-action-btn entryButton hide-on-small-only'><a class='btn-floating btn-large black entryItem'><i class='large material-icons'>mode_edit</i></a><ul><li><a class='btn-floating red delete-entry'><i class='material-icons'>delete</i></a></li><li><a href='/cms?entry_id=" + entryData.id + "' class='btn-floating yellow darken-1'><i class='material-icons'>create</i></a></li><li><a href='/notes?entry_id=" + entryData.id + "' class='btn-floating green'><i class='material-icons'>library_books</i></a></li></ul></div><div class='col s12 center hide-on-med-and-up mobileEntryButtons'><a class='waves-effect waves-light btn red delete-entry'><i class='material-icons'>delete</i></a><a href='/notes?entry_id=" + entryData.id + "' class='waves-effect waves-light btn green centerMobileButton'><i class='material-icons'>library_books</i></a><a href='/cms?entry_id=" + entryData.id + "' class='waves-effect waves-light btn yellow'><i class='material-icons'>create</i></a></div></div></div></div>"
        );
        return newEr;
    }

    function getEntries() {
        $.get("/api/entries", function(data) {
            var entriesToAdd = [];
            for (var i = 0; i < data.length; i++) {
                entriesToAdd.push(createEntry(data[i]));
            }
            renderEntryList(entriesToAdd);
            titleInput.val("");
        });
    }

    //function for rendering the list of authors to the page
    function renderEntryList(entries) {
        entryList.children().remove();
        entryList.children(".alert").remove();
        if (entries.length) {
            console.log(entries);
            entryList.prepend(entries);
        }
        else {
            renderEmpty();
        }
        $(document).trigger('appendCompleted');
    }

    // Function for handling what to render when there are no Entries
    function renderEmpty() {
        var noEntriesDiv = $('<div>');
        noEntriesDiv.addClass('alert');
        noEntriesDiv.text("You must create an Entry before you can write some notes!");
        noEntriesDiv.css({ "font-family": "Caveat Brush, cursive" });
        entryList.append(noEntriesDiv);
    }

    function handleDeleteEntryPress() {
        var confirmEntryDelete = confirm("Delete this entry?");
        if (confirmEntryDelete === true) {
            var itemData = $(this).closest('.addedRow').data('entry');
            console.log(itemData);
            var rowToDelete = $(this).closest('.addedRow');
            var id = itemData.id;
            $.ajax({
                    method: "DELETE",
                    url: "/api/entries/" + id
                })
                .done(rowToDelete.remove());
        }
        else {
            return;
        }
    }

    function handleuserNameDisplay() {
        $.get("/api/user_data", {}, function(data) {

            $('.userNameDisplay').append(data.username);
        });
    }
});
