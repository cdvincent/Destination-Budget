const passport = require("./config/passport");
const express = require("express");
const router = express.Router();
const db = require("./models");
const isAuthenticated = require("./config/middleware/isAuthenticated");

router.post("/api/register", function (req, res) {
    console.log("registering user");

      //****
  //Do validation here before attempting to register user, such as checking for password length, capital letters, special characters, etc.
  //****
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(function() {
        res.json("Registered Successfully");
    }).catch(function (err) {
        res.json(err);
    });
});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
});

router.get("/api/logout", function (req, res) {
    req.logout();
    res.json({ message: "Log Out Successful"});
});

router.get("/api/user", function (req, res) {
    if (req.query.username) {
        db.User.findOne({
            where: {username: req.query.username}
        }).then(function(result) {
            res.json(result ? {length: result.length} : {length: 0 });
        }).catch(function(err) {
            res.json(err);
        })
    } else {
        res.json({ message: "You must enter a Username" });
    };
});

router.get("/api/authorized", isAuthenticated,
    function (req, res) {
        res.json(req.user);
});
    
module.exports = router;