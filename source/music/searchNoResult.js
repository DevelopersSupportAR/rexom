const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, message, query) => {
    let lang = require('../slashCommands/play').guildLANG;
    let msg = require('quick.db').fetch(`Delete_${message.channel.id}`);
    if (lang == "en") {
        message.channel.messages.fetch(msg).then(m => m.edit({ content: `:x: | **No result found for \`${query}\`!.**`, embeds: [], allowedMentions: false }));
    } else if (lang == "ar") {
        message.channel.messages.fetch(msg).then(m => m.edit({ content: `:x: | **تم أختيار الخيار: \`${query}\`!.**`, embeds: [], allowedMentions: false }));
    }
}
