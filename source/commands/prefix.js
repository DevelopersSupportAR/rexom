const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "prefix",
    aliases: [],
    description: "Change The Bot Prefix In The Guild",

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
                if (!value) return embed.warn(message, "**You Music Specify The Prefix**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                    db.set(`Settings_${message.guild.id}`, {
                        prefix: value,
                        lang: settings.lang
                    });
                    embed.done(message, "The Prefix Has Changed In **" + message.guild.name + "** to: `" + value + "`")
                } else return embed.err(message, "**You Need To Get \"DJ\" role or get adminstrator permissions**")
            } else if (lang == "ar") {
                if (!value) return embed.warn(message, "**يجب كتابة البرفكس الجديد بعد الأمر**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                    db.set(`Settings_${message.guild.id}`, {
                        prefix: value,
                        lang: settings.lang
                    });
                    embed.done(message, "تمت تغير برفكس البوت في **" + message.guild.name + "** لـ: `" + value + "`")
                } else return embed.err(message, "**يجب انت تحصل على رتبة \"DJ\" او صلحيات الأدمنستناتور**")
            }
        } catch {
            console.log('rexom')
        }
    }
};