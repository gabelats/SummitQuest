const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const profileRoutes = require("./profile-routes");

//http://localhost:3001/api/
router.use("/api", apiRoutes);

//http://localhost:3001/
router.use("/", homeRoutes);

router.use("/profile", profileRoutes);

module.exports = router;
