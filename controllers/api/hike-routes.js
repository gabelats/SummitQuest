const router = require("express").Router();
// const { addTicks } = require("sequelize/types/utils");
const { Hikes, Users } = require("../../models");
const withAuth = require("../../utils/auth");

//http://localhost:3001/api/hikes
router.post("/", withAuth, async (req, res) => {
  try {
    const userLogId = req.session.user_id;
    console.log(userId);
    const newHike = await Hikes.create({
      userId: userLogId,
      peakId: req.body.peak_id,
      time_taken: req.body.time_taken,
      date: req.body.date,
      completed: req.body.completed,
      journal: req.body.journal,
    });
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
