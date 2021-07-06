module.exports = {
    name: "loop",
    cooldown: 3,
    description: 'repeat the song/queue',
    aliases: ["repeat"],
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
                        description: `you have to type the repeating mode type <off/repeat song/repeat queue>`,
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
            var mode = args.join(' ');
            var modeler;
            if (mode == "off") modeler = 0;
            else if (mode == "repeat song") modeler = 1;
            else if (mode == "repeat queue") modeler = 0;
            else return message.channel.send({
                embed: {
                    title: `❌ | Error`,
                    description: `you have to type the repeating mode type <off/repeat song/repeat queue>`,
                    color: 0xF70000
                }
            });
            distube.setRepeatMode(message, parseInt(modeler));
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`🔄 | Repeating`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                .setColor('GREEN')
                .setDescription(`🔄 | repeating mode has changed to: ${mode}`)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};