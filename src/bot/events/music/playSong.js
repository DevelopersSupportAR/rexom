module.exports = async function(client, message, queue, song) {
    const { MessageEmbed } = require("discord.js");
    const { MessageButton, MessageActionRow } = require("discord-buttons")
    const newSong = new MessageEmbed()
        .setAuthor(song.name, song.thumbnail, song.url)
        .setColor('GREEN')
        .setThumbnail(song.thumbnail)
        .setDescription(`✅ | **__[${song.name}](${song.url})__** is playing now`)
        .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`);
    const stop = new MessageButton()
        .setStyle('red')
        .setEmoji('🛑')
        .setID('stop');
    const loop = new MessageButton()
        .setStyle('green')
        .setEmoji('🔄')
        .setID('loop');
    const lyrics = new MessageButton()
        .setStyle('red')
        .setEmoji('📑')
        .setID('lyrics');
    const skip = new MessageButton()
        .setStyle('green')
        .setEmoji('⏭')
        .setID('skip');
    const pause = new MessageButton()
        .setStyle('green')
        .setEmoji('⏸')
        .setID('pause');
    const resume = new MessageButton()
        .setStyle('green')
        .setEmoji('▶')
        .setID('resume');
    const row = new MessageActionRow()
        .addComponent(stop)
        .addComponent(loop)
        .addComponent(lyrics);
    const row2 = new MessageActionRow()
        .addComponent(pause)
        .addComponent(resume)
        .addComponent(skip);
    message.channel.send({
        embed: newSong,
        components: [
            row,
            row2
        ]
    });
};