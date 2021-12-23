const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, queue, playlist, song) => {
    try {
        let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
        let interaction = require('../slashCommands/play').interactionGET || require('../commands/play').messageGET || require('../slashCommands/search').interactionGET || require('../commands/search').messageGET || require('../slashCommands/play-playlist').interactionGET || require('../commands/play-playlist').messageGET;
        try {
            getQueue = await player.getQueue(interaction);
        } catch (err) {
            console.log(' ')
        }
        setInterval(() => {
            try {
                let data = queue.repeatMode;
                if (data == 0) repeatModee = "Disabled";
                else if (data == 1) repeatModee = "Song";
                else if (data == 2) repeatModee = "Queue";
                else repeatModee = "Disabled";
                let data2 = queue.paused;
                if (data2 == true) pausee = "Paused";
                else if (data2 == false) pausee = "Running";
                else pausee = "Empty";
            } catch (err) {
                db.delete(`SongDashData_${interaction.guild.id}`)
            }
            if (queue.songs.map((song, id) => id + 1).length == 0) return db.delete(`SongDashData_${interaction.guild.id}`);
            db.set(`SongDashData_${interaction.guild.id}`, {
                repeat: repeatModee,
                pause: pausee,
                songs: queue.songs.map((song, id) => id + 1).length
            });
        }, 2500)
        if (lang == "en") {
            queue.textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`__**[${playlist.name}](${playlist.url})**__ playlist has  __**${playlist.total_items}**__ songs is playing now`)
                ],
                allowedMentions: { repliedUser: false }
            });
        } else if (lang == "ar") {
            queue.textChannel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`قائمة التشغيل __**[${playlist.name}](${playlist.url})**__ تحتوي على __**${playlist.total_items}**__ أغنيى, تعرض الأن`)
                ],
                allowedMentions: { repliedUser: false }
            });
        }
    } catch {
        console.log('rexom')
    }
}