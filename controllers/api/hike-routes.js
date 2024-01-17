const router = require("express").Router();
// const { addTicks } = require("sequelize/types/utils");
const { Hikes, Users } = require("../../models");
const withAuth = require("../../utils/auth");

//http://localhost:3001/hikes
router.post("/", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    console.log(userId);
    const newHike = await Hikes.create({
      user_id: userId,
      peak_id: req.body.peak_id,
      time_taken: req.body.time_taken,
      date: req.body.date,
      completed: req.body.completed,
      journal: req.body.journal,
    });
    console.log(newHike);
    // if (newHike.completed) {
    //   await Users.update({
    //     where: {
    //       id: req.session.user_id,
    //       // completed_peaks: 0,
    //     },
    //   });
    // }
    res.status(200).json(newHike);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const hikeData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!hikeData) {
      res.status(404).json({ message: "No information found!" });
      return;
    }

    res.status(200).json(hikeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
