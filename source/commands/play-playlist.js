const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require('../structures/embeds');

module.exports = {
    name: "play-playlist",
    aliases: [],
    description: "play your playlist",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            module.exports.messageGET = message;
            let z = 0;
            let value = message.content.split(' ').slice(1).join(' ');
            if (!value) return embed.warn(message, "Please input the playlist name to continue")
            let voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(message, lang);
            let data = db.fetch(`PlaylistsData_${message.author.id}`);
            if (data == null) await db.set(`PlaylistsData_${message.author.id}`, []) && embed.warn(message, `**thare are no user cold \`${message.author.username}\`!.**`);
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.name == value) {
                    z = 1;
                    for (var i = 0; i < element.songs.length; i++) {
                        (function(i) {
                            setTimeout(function() {
                                player.play(message, element.songs[i]);
                            }, 3500 * i);
                        })(i);
                    };
                }
            }
            message.channel.sendTyping();
            if (z == 1) {
                setTimeout(async() => {
                    await embed.done(message, "you playlist is running!")
                }, 1440)
            } else {
                setTimeout(async() => {
                    await embed.err(message, "i can't find this playlist!")
                }, 1440)
            }
        } catch {
            console.log('rexom')
        }
    }
};