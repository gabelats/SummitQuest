const Users = require("./Users");
const Hikes = require("./Hikes");
const Peaks = require("./Peaks");

//user can belong to many peaks and many hikes,
// Users.hasMany(Hikes, {
//   foreignKey: "user_id",
// });

// Hikes.belongsTo(Users, {
//   foreignKey: "user_id",
// });
Users.belongsToMany(Peaks, {
  through: {
    model: Hikes,
    foreignKey: "user_id",
    unique: false,
  },
});

Peaks.belongsToMany(Users, {
  through: {
    model: Hikes,
    foreignKey: "peak_id",
    unique: false,
  },
});

module.exports = {
  Users,
  Hikes,
  Peaks,
};
