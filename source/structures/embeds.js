const { MessageEmbed, Message, Client } = require("discord.js");
const emojis = require("../../config/emojis.json");
const colors = require("../../config/colors.json");

/**
 * 
 * @param {Client} client
 * @param {Message} message
 * @param {Guild} guild
 */

module.exports = {
    err: async(message, content) => {
        let embed = new MessageEmbed()
            .setColor(colors.error)
            .setDescription(emojis.error + " | " + content);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
    done: async(message, content) => {
        let embed = new MessageEmbed()
            .setColor(colors.done)
            .setDescription(emojis.done + " | " + content);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
    loading: async(message, content) => {
        let embed = new MessageEmbed()
            .setColor(colors.loading)
            .setDescription(emojis.loading + " | " + content);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
    warn: async(message, content) => {
        let embed = new MessageEmbed()
            .setColor(colors.warn)
            .setDescription(emojis.warn + " | " + content);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
    notInVoice: async(message, lang) => {
        let msg;
        if (lang == "en") msg = "**You Have To Be On Voice Channel**";
        if (lang == "ar") msg = "**يجب انت تكون في غرفه صوتيه**";
        let embed = new MessageEmbed()
            .setColor(colors.error)
            .setDescription(emojis.error + " | " + msg);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
    notQueue: async(message, lang) => {
        let msg;
        if (lang == "en") msg = "**Thare are no music in the queue**";
        if (lang == "ar") msg = "**لم يتم تشغيل اي أغنيه اصلا**";
        let embed = new MessageEmbed()
            .setColor(colors.error)
            .setDescription(emojis.error + " | " + msg);

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false }).catch(() => {
            message.channel.sned({ embeds: [embed], allowedMentions: { repliedUser: false }, ephemeral: false });
        });
    },
}