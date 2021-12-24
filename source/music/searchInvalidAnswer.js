const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, message) => {
    try {
        let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
        if (lang == "en") {
            message.channel.send({ content: ":x: | **Worang Input!.**", embeds: [], allowedMentions: {
            repliedUser: false
        } });
        } else if (lang == "ar") {
            message.channel.send({ content: ":x: | **أدخال خاطء!.**", embeds: [], allowedMentions: {
            repliedUser: false
        } });
        }
    } catch {
        console.log('rexom')
    }
}