const { MessageEmbed, Message, Client } = require("discord.js");
const emojis = require("../../config/emojis.json");
const colors = require("../../config/colors.json");

/**
 * 
 * @param {Client} client
 * @param {Message} message
 */

module.exports = {
    err: async(message, content, type) => {
        try {
            let embed = new MessageEmbed()
                .setColor(colors.error)
                .setDescription(emojis.error + " | " + content);

            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
    done: async(message, content, type) => {
        try {
            let embed = new MessageEmbed()
                .setColor(colors.done)
                .setDescription(emojis.done + " | " + content);
            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
    loading: async(message, content, type) => {
        try {
            let embed = new MessageEmbed()
                .setColor(colors.loading)
                .setDescription(emojis.loading + " | " + content);

            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
    warn: async(message, content, type) => {
        try {
            let embed = new MessageEmbed()
                .setColor(colors.warn)
                .setDescription(emojis.warn + " | " + content);
            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
    notInVoice: async(message, lang, type) => {
        try {
            let msg;
            if (lang == "en") msg = "**You Have To Be On Voice Channel**";
            if (lang == "ar") msg = "**يجب انت تكون في غرفه صوتيه**";
            let embed = new MessageEmbed()
                .setColor(colors.warn)
                .setDescription(emojis.warn + " | " + msg);
            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
    notQueue: async(message, lang, type) => {
        try {
            let msg;
            if (lang == "en") msg = "**Thare are no music in the queue**";
            if (lang == "ar") msg = "**لم يتم تشغيل اي أغنيه اصلا**";
            let embed = new MessageEmbed()
                .setColor(colors.warn)
                .setDescription(emojis.warn + " | " + msg);
            if (type == "/") {
                message.followUp({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
                    message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
                });
            }
        } catch {
            console.log('rexom')
        }
    },
}