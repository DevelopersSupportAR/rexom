module.exports = {
        name: "queue",
        cooldown: 3,
        description: 'view the server queue',
        aliases: ["q"],
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
                    message.channel.send(
                            new MessageEmbed()
                            .setAuthor(`Server Queue`, message.guild.iconURL({ dynaimc: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                            .setColor('YELLOW')
                            .setThumbnail(message.guild.iconURL({ dynaimc: true }))
                            .setDescription(`__Now Playing:__\n${queue.songs.map((song, id) => `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(0, 1).join("\n")}\n\n__Up Next:__\n${queue.songs.map((song, id) => `**${id + 1}**. **[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(1, 10).join("\n")}`)
            .setFooter(client.user.username, client.user.avatarURL({ dynaimc: true }))
            );
        } catch (err) {
            console.log(err)
        }
    }
};