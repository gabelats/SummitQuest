const router = require("express").Router();
const peakRoutes = require("./peak-routes");
const hikeRoutes = require("./hike-routes");
const userRoutes = require("./user-routes");

//http://localhost:3001/api/peaks
router.use("/peaks", peakRoutes);

//http://localhost:3001/api/hikes
router.use("/hikes", hikeRoutes);

//http://localhost:3001/api/users
router.use("/users", userRoutes);

module.exports = router;
