async function guildCreateFunction(guild, db) {
    db.set(`Settings_${guild.id}`, {
        prefix: require('../../config/bot.json').mainPrefix,
        lang: require('../../config/bot.json').mainLang
    });
};

module.exports.get = guildCreateFunction;