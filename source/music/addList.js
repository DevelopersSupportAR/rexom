const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue, playlist) => {
    try {
        let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
        if (lang == "en") {
            queue.textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`__**[${playlist.name}](${playlist.url})**__ playlist has  __**${playlist.total_items}**__ songs has add in the queue`)
                ],
                allowedMentions: { repliedUser: false }
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            });
        } else if (lang == "ar") {
            queue.textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`قائمة التشغيل __**[${playlist.name}](${playlist.url})**__ تحتوي على __**${playlist.total_items}**__ أغنيه, تمت أضافتهم لطابور العرض`)
                ],
                allowedMentions: { repliedUser: false }
            }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000);
            });
        }
    } catch {
        console.log('rexom')
    }
}