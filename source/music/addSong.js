const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue, song) => {
    try {
        let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
        if (lang == "en") {
            queue.textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setThumbnail(song.thumbnail)
                    .setDescription(`✅ | **__[${song.name}](${song.url})__** has been add to queue`)
                    .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
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
                    .setThumbnail(song.thumbnail)
                    .setDescription(`✅ | **__[${song.name}](${song.url})__** قد أضيفة لقائمة التشغيل`)
                    .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
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