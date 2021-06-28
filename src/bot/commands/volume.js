module.exports = {
    name: "volume",
    cooldown: 3,
    description: 'change the songs volume',
    aliases: ["vol", "v"],
    run: async function(client, message, args, user) {
        try {
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
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `please type the volume level`,
                        color: 0xF70000
                    }
                });
                return
            }
            if (isNaN(args[0])) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `volume level must be a number`,
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
            distube.setVolume(message, args[0]);
            message.channel.send(
                new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🔊 | Volume level has changed to \`${args[0]}\``)
            )
        } catch (err) {
            console.log(err)
        }
    }
};