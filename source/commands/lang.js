const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "lang",
    aliases: [],
    description: "Change The Bot Lang In The Guild",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        let value = args[1];
        let settings = db.fetch(`Settings_${message.guild.id}`);
        if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | You Music Specify The Lang ['en', 'ar']`,
                ephemeral: true,
                allowedMentions: false
            });
            if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                if (!["en", "ar"].includes(value)) return message.reply({
                    content: emojis.error + ` | only ['ar', 'en'] lang is allowed`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`Settings_${message.guild.id}`, {
                    prefix: settings.prefix,
                    lang: value
                });
                message.reply({
                    content: emojis.done + " | The Lang Has Changed In **" + message.guild.name + "** to: `" + value + "`",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + ` | You Need To Get \"DJ\" role or get adminstrator permissions`,
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | عليك تحديد لغه البوت ['ar', 'en']`,
                ephemeral: true,
                allowedMentions: false
            });
            if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                if (!["en", "ar"].includes(value)) return message.reply({
                    content: emojis.error + ` | فقط لغة ['ar', 'en'] مسموحه`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`Settings_${message.guild.id}`, {
                    prefix: settings.prefix,
                    lang: value
                });
                message.reply({
                    content: emojis.done + " | تمت تغير لغة البوت في **" + message.guild.name + "** لـ: `" + value + "`",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + ` | يجب انت تحصل على رتبة \"DJ\" او صلحيات الأدمنستناتور`,
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};