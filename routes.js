const passport = require("passport");
const express = require("express");
const router = express.Router();
const db = require("./models");
var isAuthenticated = require("./config/middleware/isAuthenticated");

router.post("/api/register", function(req, res) {
  console.log(req);

  db.User.register(
    new db.User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      passport.authenticate("local")(req, res, function(data) {
        res.json(req.user);
      });
    }
  );
});

router.post("/api/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.post("/api/trips", function(req, res) {
  console.log(req.body)
    db.Trips.create(
      new db.Trips({ 
        username: req.body.username,
        totalCost: req.body.totalCost,
        whereFrom: req.body.whereFrom,
        whereTo: req.body.whereTo,
        travelDate: req.body.travelDate,
        quantity: req.body.quantity
  })).then(function(trips) {
    res.json(trips)
  }).catch(function(err) {
    res.json(err);
  });
});


router.get("/api/trips/:username", function(req, res) {
  console.log(req.params.username);
  db.Trips.find({username: req.params.username})
  .then(function(trips) {
    res.json(trips);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.delete("/api/trips/:id", function(req, res) {
  db.Trips.findByIdAndRemove({_id: req.params.id})
  .then(function(trips) {
    res.json(trips);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.post("/api/budget", function(req, res) {
  console.log(req.body)
    db.Budget.create(
      new db.Budget({ 
        username: req.body.username,
        rent: req.body.rent,
        utilities: req.body.utilities,
        internet: req.body.internet,
        carExpenses: req.body.carExpenses,
        groceries: req.body.groceries,
        cell: req.body.cell,
        creditCards: req.body.creditCards,
        otherExpenses: req.body.otherExpenses,
        income: req.body.income,
        totalBudget: req.body.totalBudget,
        dispIncome: req.body.dispIncome
  })).then(function(budget) {
    res.json(budget)
  }).catch(function(err) {
    res.json(err);
  });
});

router.get("/api/budget/:username", function(req, res) {
  console.log(req.params.username);
  db.Budget.find({username: req.params.username})
  .then(function(budget) {
    res.json(budget);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.delete("/api/budget/:id", function(req, res) {
  db.Budget.findByIdAndRemove({_id: req.params.id})
  .then(function(budget) {
    res.json(budget);
  })
  .catch(function(err) {
    res.json(err);
  });
});

router.get("/api/logout", function(req, res) {
  req.logout();
  res.json({ message: "logged out" });
});

router.get("/api/user", function(req, res) {
  console.log("available username");
  if (req.query.username) {
    db.User.find({ username: req.query.username })
    .then(result => {
      res.json({ length: result.length });
      })
      .catch(err => res.status(422).json(err));
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/authorized", isAuthenticated, function(req, res) {
  res.json(req.user);
});

module.exports = router;
