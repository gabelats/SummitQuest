const router = require("express").Router();
const { Hikes, Peaks, Users } = require("../models");
const withAuth = require("../utils/auth");
//http://localhost:3001/
router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  if (req.session.logged_in) {
    res.redirect(`profile/${req.session.username}`);
  }
});

//http://localhost:3001/dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const hikesData = await Hikes.findAll();
    const hikes = await hikesData.map((hike) => hike.get({ plain: true }));

    const peakList = await Peaks.findAll();
    const allPeaks = await peakList.map((peaks) => peaks.get({ plain: true }));

    res.render("dashboard", {
      hikes,
      allPeaks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  if (req.session.logged_in) {
    res.redirect(`profile/${req.session.username}`);
  }
});

router.get("/peaks/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  try {
    const peakData = await Peaks.findByPk(req.params.id);
    const peaks = await peakData.map((peaks) => peaks.get({ plain: true }));
    res.render("peaks", {
      peaks,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
