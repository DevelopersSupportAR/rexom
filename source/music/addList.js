const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue, playlist) => {
    let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
    if (lang == "en") {
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(playlist.name, client.user.avatarURL({ dynamic: true }), playlist.url)
                .setColor('GREEN')
                .setDescription(`__**[${playlist.name}](${playlist.url})**__ playlist has  __**${playlist.total_items}**__ songs has add in the queue`)
            ],
            allowedMentions: { repliedUser: false }
        });
    } else if (lang == "ar") {
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(playlist.name, client.user.avatarURL({ dynamic: true }), playlist.url)
                .setColor('GREEN')
                .setDescription(`قائمة التشغيل __**[${playlist.name}](${playlist.url})**__ تحتوي على __**${playlist.total_items}**__ أغنيه, تمت أضافتهم لطابور العرض`)
            ],
            allowedMentions: { repliedUser: false }
        });
    }
}