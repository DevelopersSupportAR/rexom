const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue, song) => {
    let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
    if (lang == "en") {
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(song.name, song.thumbnail, song.url)
                .setColor('GREEN')
                .setThumbnail(song.thumbnail)
                .setDescription(`✅ | **__[${song.name}](${song.url})__** has been add to queue`)
                .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
            ],
            allowedMentions: { repliedUser: false }
        });
    } else if (lang == "ar") {
        queue.textChannel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(song.name, song.thumbnail, song.url)
                .setColor('GREEN')
                .setThumbnail(song.thumbnail)
                .setDescription(`✅ | **__[${song.name}](${song.url})__** قد أضيفة لقائمة التشغيل`)
                .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
            ],
            allowedMentions: { repliedUser: false }
        });
    }
}