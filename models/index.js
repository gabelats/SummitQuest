const Users = require("./Users");
const Hikes = require("./Hikes");
const Peaks = require("./Peaks");

Users.belongsToMany(Peaks, { through: Hikes });
Peaks.belongsToMany(Users, { through: Hikes });
Users.hasMany(Hikes);
Hikes.belongsTo(Users);
Peaks.hasMany(Hikes);
Hikes.belongsTo(Peaks);
module.exports = {
  Users,
  Hikes,
  Peaks,
};
