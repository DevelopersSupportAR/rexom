const db = require("quick.db");

module.exports = async (client, guild) => {
  require("../functions/guildDeleteFunction")
    .get(guild, db)
    .catch((err) => console.log(err));
};
