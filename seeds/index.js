const seedPeaks = require("./peak-seed");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedPeaks();
  console.log("\n----- PEAKS SEEDED -----\n");
  process.exit(0);
};
seedAll();
