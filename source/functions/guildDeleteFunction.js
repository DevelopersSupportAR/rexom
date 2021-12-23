async function guildDeleteFunction(guild, db) {
    db.delete(`Settings_${guild.id}`);
};

module.exports.get = guildDeleteFunction;