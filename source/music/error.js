const { Client, MessageEmbed, TextChannel } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {TextChannel} channel
 */

module.exports = async(client, channel, error) => {
    channel.send({
        embeds: [
            new MessageEmbed()
            .setColor('RED')
            .setDescription(`${error}`)
        ]
    })
}