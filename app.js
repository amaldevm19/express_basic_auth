var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { engine } = require("express-handlebars");
require("dotenv").config();
const session = require("express-session");
const flash = require("express-flash");

var homeRouter = require("./routes/homeRoutes");
var usersRouter = require("./routes/usersRoutes");
const restrictedRouter = require("./routes/restrictedRoutes");
const db = require("./config/db");
const userMiddleware = require("./middlewares/userMiddleware");

var app = express();

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "very very secret code",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      sameSite: false,
      secure: false,
      expires: 600000,
    },
  })
);

//getting session variables in express handlebars eg: {{session.SOMETHINHG_THAT_YOU_ASSIGNED}}
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(flash());

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/restricted-page", restrictedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
