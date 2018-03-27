//this code specifically restricts routes a user is not allowed to visit if not logged in

module.exports = function(req, res, next) {
    //if the user is logged in, continue with the request
    if (req.user) {
        return next();
    }

    // if they are not logged in they are directed to the login screen
    return res.redirect("/login");
};
