const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require('../structures/embeds');

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
        try {
            let value = args[1];
            let settings = db.fetch(`Settings_${message.guild.id}`);
            if (lang == "en") {
                if (!value) return embed.warn(message, "**You Music Specify The Lang ['en', 'ar']**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                    if (!["en", "ar"].includes(value)) return embed.err(message, "**only ['ar', 'en'] lang is allowed**")
                    db.set(`Settings_${message.guild.id}`, {
                        prefix: settings.prefix,
                        lang: value
                    });
                    embed.done(message, "The Lang Has Changed In **" + message.guild.name + "** to: `" + value + "`")
                } else embed.err(message, "**You Need To Get \"DJ\" role or get adminstrator permissions**")
            } else if (lang == "ar") {
                if (!value) return embed.warn(message, "**عليك تحديد لغه البوت ['ar', 'en']**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                    if (!["en", "ar"].includes(value)) return embed.err(message, "**فقط لغة ['ar', 'en'] مسموحه**")
                    db.set(`Settings_${message.guild.id}`, {
                        prefix: settings.prefix,
                        lang: value
                    });
                    embed.done(message, "تمت تغير لغة البوت في **" + message.guild.name + "** لـ: `" + value + "`")
                } else embed.err(message, "يجب انت تحصل على رتبة \"DJ\" او صلحيات الأدمنستناتور")
            }
        } catch {
            console.log('rexom')
        }
    }
};