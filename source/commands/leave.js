const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "leave",
    aliases: [],
    description: "leave the 24/7 channel",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            db.delete(`Voice_Channel_${message.guild.id}`);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | تمت ازالة التثبيت من: <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            db.delete(`Voice_Channel_${message.guild.id}`);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | Done Leaved <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};