const router = require("express").Router();
const { Hikes, Peaks, Users } = require("../models");

//http://localhost:3001/
//send all completed hikes to users profile page
router.get("/", async (req, res) => {
  try {
    const userData = await Users.findAll({
      include: [
        {
          model: Peaks,
          through: Hikes,
        },
      ],
      //   where: {
      //     completed: true,
      //   },
    });
    const peaks = userData.map((user) => user.get({ plain: true }));

    res.render("profile", {
      peaks,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//http://localhost:3001/
router.get("/", async (req, res) => {
  try {
    const peakData = await Peaks.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
      where: {
        completed: false,
      },
    });
    const peaks = peakData.map((peaks) => peaks.get({ plain: true }));

    res.render("profile", {
      peaks,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
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
