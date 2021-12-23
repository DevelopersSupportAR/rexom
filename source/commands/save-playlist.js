const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "save-playlist",
    aliases: [],
    description: "save a playlist",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = message.content.split(' ').slice(1).join(' ');
            if (!value) return embed.warn(message, "Please input the playlist name to continue")
            let queue = player.getQueue(message);
            if (!queue) embed.notQueue(message, lang);
            let voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(message, lang);
            let checkData = db.fetch(`PlaylistsData_${message.author.id}`);
            if (checkData !== null) {
                let i = 0;
                for (let index = 0; index < checkData.length; index++) {
                    const element = checkData[index];
                    if (element.name == value) {
                        i = 1;
                        let btn = new MessageButton()
                            .setEmoji(emojis.done)
                            .setCustomId('a')
                            .setStyle("SUCCESS")
                        let cancel = new MessageButton()
                            .setEmoji(emojis.error)
                            .setCustomId('c')
                            .setStyle("DANGER")
                        let row = new MessageActionRow()
                            .addComponents(btn, cancel);
                        let filter = i => i.user.id == message.author.id;
                        let msg = await message.reply({ content: emojis.warn + " | **you have a saved playlist with this name,\n you can't add two playlists with the same name but you can delete it!**", ephemeral: false, components: [row] });
                        let collector = await msg.createMessageComponentCollector(filter, { time: 0 });

                        collector.on("collect", async(i) => {
                            i.deferReply({ ephemeral: true }).catch(() => {});
                            if (i.customId == "a") {
                                checkData.forEach(ps => {
                                    if (ps.name !== value) db.push(`PlaylistsData_${message.author.id}`, ps)
                                });
                                return i.followUp({ content: emojis.done + " | **Playlist Has Removed**", ephemeral: true, components: [] })
                            } else if (i.customId == "c") {
                                return i.followUp({ content: emojis.done + " | **Playlist Is Still Working**", ephemeral: true, components: [] })
                            }
                        });
                        return;
                    }
                }
                message.channel.sendTyping();
                await setTimeout(async() => {
                    if (i !== 1) {
                        let object = {
                            name: value,
                            creator: message.author.id,
                            songs: []
                        }
                        queue.songs.forEach(song => {
                            object.songs.push(`${song.url}`)
                        });
                        await db.push(`PlaylistsData_${message.author.id}`, object);
                        embed.done(message, `**you have saved a new playlist on rexom cold \`${value}\`!**`);
                    }
                }, 3500);
            } else await db.set(`PlaylistsData_${message.author.id}`, []) && embed.warn(message, "**Your New Profile Has Setuped Please use the command again!.**");
        } catch {
            console.log('rexom')
        }
    }
};