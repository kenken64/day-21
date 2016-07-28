//Load express
var express = require("express");
//Create an instance of express application
var app = express();

var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: "something-crypric",
    saved: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require("./auth")(app, passport);
require("./routes")(app);

app.post("/login", passport.authenticate("local", {
    successRedirect: "/status/202",
    failureRedirect: "/status/403"
}));


app.get("/status/:code", function (req, res) {

    var code = parseInt(req.params.code);

    res.status(code).end();
});

app.listen(3000, function () {
    console.log("Listening on ", 3000)
});











