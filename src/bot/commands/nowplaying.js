module.exports = {
    name: "nowplaying",
    cooldown: 3,
    description: 'view what is playing now',
    aliases: ["np"],
    run: async function(client, message, args, user) {
        try {
            const { toColonNotation } = require("colon-notation")
            const progressbar = require("string-progressbar")
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to be in a voice channel to use this command`,
                        color: 0xF70000
                    }
                });
                return
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the bot need's same permissions to play a music like \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            let queue = distube.getQueue(message);
            if (!queue) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `the server queue is empty please play a music first`,
                        color: 0xF70000
                    }
                });
                return
            }
            let track = queue.songs[0];
            const time = track.duration * 1000;
            const currentTime = queue.currentTime;
            const result = new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(track.name, track.Thumbnail, track.url)
                .setDescription(`${client.distube.isPaused(message) === true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                .setThumbnail(track.Thumbnail)
            message.channel.send({ embed: result }).then(async function(msg) {
                setInterval(() => {
                    msg.edit({
                        embed: new MessageEmbed()
                            .setColor('YELLOW')
                            .setAuthor(track.name, track.Thumbnail, track.url)
                            .setDescription(`${client.distube.isPaused(message) === true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                            .setThumbnail(track.Thumbnail)
                    })
                }, 5000);
            })
        } catch (err) {
            console.log(err)
        }
    }
};