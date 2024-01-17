const router = require("express").Router();
const { Hikes, Peaks, Users } = require("../models");

//http://localhost:3001/
router.get("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  }
  if (req.session.logged_in) {
    res.redirect(`profile/${req.session.username}`);
  }
});
//http://localhost:3001/peaks/{id passed/selected}
router.get("/peaks/:id", async (req, res) => {
  try {
    const peakData = await Peaks.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ["username"],
          through: Hikes,
        },
      ],
    });

    const peaks = peakData.get({ plain: true });

    res.render("journal", {
      ...journal,
      logged_in: req.session.logged_in,
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
    res.render("profile", {
      logged_in: req.session.logged_in,
    });
  }
});

module.exports = router;
