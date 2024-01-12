const Users = require("./Users");
const Hikes = require("./Hikes");
const Peaks = require("./Peaks");

Users.belongsToMany(Peaks, {
  through: {
    model: Hikes,
    unique: false,
  },
});

Peaks.belongsToMany(Users, {
  through: {
    model: Hikes,
    unique: false,
  },
});

module.exports = {
  Users,
  Hikes,
  Peaks,
};
