const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue) => {
    try {
        let lang = require('../interactions/music/play').guildLANG || require('../commands/music/play').guildLANG;
        if (lang == "en") {
            queue.textChannel.send('Channel is empty. Leaving the channel')
        } else if (lang == "ar") {
            queue.textChannel.send('القناه فارغه. جار مفادرة القناه')
        }
    } catch {
        console.log('rexom')
    }
}