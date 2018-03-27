UI
- login page
- register page
- home page
- notes page --- collapsable note tabs with title on outer shell????

general flow - User has home page where they can add books/events they want to take notes on.  That appends onto the page, with a write notes button.  When write notes button is clicked the user is navigated to the notes page which populates the page with that specific events/books' notes.  The user also has the option of adding new notes to that book (each note has details for organized materials).

User Auth
-passport

database
-sequelize/mysql
-2 seperate schemas (1 for auth one for entries)
    --- table for entries
            - title
            - summary
            - note
                - name
                - date
                - body
                
