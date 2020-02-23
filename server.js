require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const db = require("./models");
const unirest = require("unirest");

const app = express();
const PORT = process.env.PORT || 3001;

const passport = require("passport");
const session = require("express-session");
// Define middleware here
app.use(session({ secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);

// Define API routes here

const req = unirest("POST", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/");

req.headers({
  "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
	"x-rapidapi-key": "5f49839056msh0904f5e8160aafap1c21f4jsn934d1f26815d",
	"content-type": "application/x-www-form-urlencoded"
});

let whereFrom = "" + "-sky"
let whereTo= "" + "sky"
let depDate = "2020-03-01" // format to 2020-03-01
let retDate = "2020-03-03" // format to 2020-03-01
let queryURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/" + whereFrom + "/" + whereTo + "/" + depDate + "/" + retDate
// SFO-sky/ORD-sky/2020-03-01?inboundpartialdate=2020-03-03

unirest.get(queryURL)
.header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", "5f49839056msh0904f5e8160aafap1c21f4jsn934d1f26815d")
.end(function (result) {
  // console.log(result.status, result.headers, result.body);
  console.log(result.body.Quotes);
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}


db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(`API Server now listening on PORT ${PORT}!`);
  });
});
