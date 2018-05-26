$(document).ready(function() {

    // Materialize Initilizations
    $('.dropdown-trigger').dropdown({
        hover: false,
        coverTrigger: false,
        alignment: 'right'
    });

    $('.datepicker').datepicker();
    $('.modal').modal();

});

$(document).on('appendCompleted', function() {

    $('.fixed-action-btn').floatingActionButton({
        direction: "left",
        hoverEnabled: false
    });

    $('.mobileEntryButton').floatingActionButton({
        direction: "right",
        hoverEnabled: false
    });
    $('.collapsible').collapsible();
    // so the buttons do not cause the collapsible to dropdown on click
    // $(".deleteNote, .editNote").on("click", function(e) {
    //     e.stopPropagation();
    // });
});
