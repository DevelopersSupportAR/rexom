const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "jump",
    aliases: [],
    description: "skip a specific song",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        let value = args[1]
        if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | يجب تحديد رقم الأغنيه في طابور العرض`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            try {
                player.jump(message, parseInt(value))
            } catch (err) {
                message.reply({
                    content: "لا يمكن العثور على رقم الأغنيه في طابور عرض الموسيقى",
                    ephemeral: true,
                    allowedMentions: false
                })
                throw err;
            }
            message.reply({
                embeds: [new MessageEmbed()
                    .setAuthor(`⤵ | Jump`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                    .setColor('GREEN')
                    .setDescription(`⤵ | تم القفظ الى الأغنيه صاحبة الرقم: \`${parseInt(value)}\``)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | You Music Specify The Song Number On Server Queue`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            try {
                player.jump(message, parseInt(value))
            } catch (err) {
                message.reply({
                    content: "the bot can't find this song number on the server queue",
                    ephemeral: true,
                    allowedMentions: false
                })
                throw err;
            }
            message.reply({
                embeds: [new MessageEmbed()
                    .setAuthor(`⤵ | Jump`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                    .setColor('GREEN')
                    .setDescription(`⤵ | done jumped to song number \`${parseInt(value)}\``)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};