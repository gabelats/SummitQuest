const router = require("express").Router();
const { Peaks, Users, Hikes } = require("../../models");

//Get All
//http://localhost:3001/api/peaks
router.get("/", async (req, res) => {
  try {
    const allPeaks = await Peaks.findAll();
    res.status(200).json(allPeaks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get peak by ID
//http://localhost:3001/api/peaks/:id
router.get("/:id", async (req, res) => {
  try {
    const findPeak = await Peaks.findByPk(req.params.id);

    if (!findPeak) {
      res.status(404).json({ message: "No mountain found" });
    }
    res.status(200).json(findPeak);
  } catch (error) {
    res.status(500).json(error);
  }
});
