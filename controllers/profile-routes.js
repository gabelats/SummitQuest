const router = require("express").Router();
const { Users, Hikes, Peaks } = require("../models");
const withAuth = require("../utils/auth");
//http://localhost:3001/profile/:username
router.get("/:username", withAuth, async (req, res) => {
  try {
    const userByName = await Users.findOne({
      where: {
        username: req.params.username,
      },
      include: Peaks,
    });

    const user = await userByName.get({ plain: true });
    const peakList = await Peaks.findAll();
    const allPeaks = await peakList.map((peaks) => peaks.get({ plain: true }));

    res.render("profile", {
      user,
      allPeaks,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  if (req.session.logged_in) {
    res.redirect(`profile/${req.session.username}`);
  }
});

module.exports = router;
