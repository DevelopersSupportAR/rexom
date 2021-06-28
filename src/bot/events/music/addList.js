module.exports = async function(client, message, queue, playlist) {
    const { MessageEmbed } = require("discord.js");
    message.channel.send(
        new MessageEmbed()
        .setAuthor(playlist.name, client.user.avatarURL({ dynamic: true }), playlist.url)
        .setColor('GREEN')
        .setDescription(`__**[${playlist.name}](${playlist.url})**__ playlist has  __**${playlist.total_items}**__ songs has add in the queue`)
    )
}