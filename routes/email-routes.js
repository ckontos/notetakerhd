const nodemailer = require('nodemailer');

var Transport = nodemailer.createTransport({
    service: "gmail",
    host: "ckontoswebpage@gmail.com",
    auth: {
        user: "ckontoswebpage@gmail.com",
        pass: "Cdkjob3!"
    }
});

module.exports = function(app, flag) {

    app.get('/', function(req, res) {
        res.sendfile('home.html');
    });
    app.get('/send', function(req, res) {
        var mailOptions = {
            to: req.query.to,
            subject: req.query.subject,
            html: req.query.html
        };
        console.log(mailOptions);
        Transport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            }
            else {
                res.end("sent");
            }
        });
    });
};
