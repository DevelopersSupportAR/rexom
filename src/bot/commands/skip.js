module.exports = {
        name: "skip",
        cooldown: 3,
        description: 'skip the song',
        aliases: ["s"],
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
                    distube.skip(message);
                    message.channel.send(
                            new MessageEmbed()
                            .setColor('GREEN')
                            .setDescription(`⏭ | ${queue.songs.map((song, id) =>
        `**[${song.name}](${song.url})**`).slice(0, 1).join("\n")} has skiped to ${queue.songs.map((song, id) =>
        `**[${song.name}](${song.url})**`).slice(1, 2).join("\n")}`)
            .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
        )
    } catch (err) {
        console.log(err)
    }
}
}