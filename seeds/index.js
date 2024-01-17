const sequelize = require("../config/connection");
const { Hikes, Peaks, Users } = require("../models");
const hikesData = require("./hike-seed");
const peaksData = require("./peak-seed");
const usersData = require("./user-seed");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  for (const peaks of peaksData) {
    await Peaks.create({
      ...peaks,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  await Hikes.bulkCreate(hikesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};
seedDb();
