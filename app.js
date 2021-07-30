var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require('express-session');
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret", // used to sign the cookie
    resave: false, // update session even w/ no changes
    saveUninitialized: true, // always create a session
    cookie: {
      secure: false, // true: only accept https req's
      maxAge: 2592000, // time in seconds aka 30 days
    },
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
