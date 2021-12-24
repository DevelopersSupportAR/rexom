const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, message, query) => {
    try {
        let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
        let msg = require('quick.db').fetch(`Delete_${message.channel.id}`);
        if (lang == "en") {
            message.channel.messages.fetch(msg).then(m => m.edit({ content: ":x: | **Time Out!.**", embeds: [], allowedMentions: {
            repliedUser: false
        } }));
        } else if (lang == "ar") {
            message.channel.messages.fetch(msg).then(m => m.edit({ content: ":x: | **انتها الوقت!.**", embeds: [], allowedMentions: {
            repliedUser: false
        } }));
        }
    } catch {
        console.log('rexom')
    }
}