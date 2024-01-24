const router = require("express").Router();
const { Users, Hikes, Peaks } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

//http://localhost:3001/api/users/
router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.findAll();

    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// http://localhost:3001/api/users/
// sign up
router.post("/", async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/users/login
router.post("/login", async (req, res) => {
  try {
    const userData = await Users.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(400).json({ message: "incorrect email or password" });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "incorrect email or password" });
    }
    console.log(userData.username);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.password = userData.password;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: "login successful" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/users/bio
router.post("/bio", withAuth, async (req, res) => {
  try {
    const userLogId = req.session.user_id;
    const userName = req.session.username;
    const userEmail = req.session.email;
    const userPassword = req.session.password;

    const userBio = await Users.create({
      userId: userLogId,
      username: userName,
      email: userEmail,
      password: userPassword,
      bio: req.body.bio,
    });
    res.status(200).json(userBio);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//http://localhost:3001/api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
