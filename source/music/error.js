const { Client, MessageEmbed, TextChannel } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {TextChannel} channel
 */

module.exports = async(client, channel, error) => {
    try {
        channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('RED')
                .setDescription(`${error}`)
            ]
        });
    } catch {
        console.log('rexom')
    }
}