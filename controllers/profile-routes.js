const router = require("express").Router();
const { Users, Hikes, Peaks } = require("../../models");

//http://localhost:3001/profile/:username
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
    });
    console.log(userByName);

    const user = await userByName.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
