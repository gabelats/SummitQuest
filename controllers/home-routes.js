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
    const hikesData = await Hikes.findAll({
      include: [Peaks, Users],
    });
    const hikes = await hikesData.map((hike) => hike.get({ plain: true }));

    const peakList = await Peaks.findAll();
    const allPeaks = await peakList.map((peaks) => peaks.get({ plain: true }));
    const featurePeaks = await allPeaks[
      Math.floor(Math.random() * allPeaks.length)
    ];
    console.log(featurePeaks);

    console.log(hikes);
    let completedHikes = [];
    for (i = 0; i < hikes.length; i++) {
      if (hikes[i].completed) {
        completedHikes.push(hikes[i]);
      }
    }
    let recentHikes = [];
    for (i = completedHikes.length - 3; i < completedHikes.length; i++) {
      recentHikes.push(completedHikes[i]);
    }

    res.render("dashboard", {
      hikes,
      allPeaks,
      featurePeaks,
      recentHikes,
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
    const peaks = await peakData.get({ plain: true });
    res.render("peaks", {
      peaks,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
