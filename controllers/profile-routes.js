const router = require("express").Router();
const { Users, Hikes, Peaks } = require("../models");

//http://localhost:3001/profile/:username
router.get("/:username", async (req, res) => {
  try {
    console.log(`line 7: ${req.params.username}`);
    const userByName = await Users.findOne({
      where: {
        username: req.params.username,
      },
      include: Peaks,
    });
    console.log(userByName);

    const user = await userByName.map((user) =>
      userByName.get({ plain: true })
    );

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const userByName = await Users.findOne({
      where: {
        username: req.params.username,
      },
      include: [
        {
          model: Peaks,
          through: Hikes,
        },
        { model: Hikes },
      ],
      where: {
        completed: false,
      },
    });
    console.log(userByName);

    const user = await userByName.map((user) =>
      userByName.get({ plain: true })
    );

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
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
