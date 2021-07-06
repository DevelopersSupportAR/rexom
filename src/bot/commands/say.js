module.exports = {
    name: "say",
    cooldown: 3,
    description: 'makes the bot repeat what you say',
    aliases: [],
    run: async function(client, message, args, user) {
        try {
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
                        description: `please type the filter name after the command <3d/bassboost/echo/karaoke/nightcore/vaporwave>`,
                        color: 0xF70000
                    }
                });
                return
            }
            const broadcast = await client.voice.createBroadcast();
            voiceChannel.join().then(async connection => {
                broadcast.play(require('discord-tts').getVoiceStream(args.join(' ')));
                connection.play(broadcast);
            });
            message.react('✅')
        } catch (err) {
            console.log(err)
        }
    }
};