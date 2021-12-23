const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require('../structures/embeds');

module.exports = {
    name: "dj",
    aliases: ["set-dj"],
    description: "Set Dj Role To Controle The Bot",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let toogle = args[2];
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
            if (lang == "en") {
                if (!role) return embed.warn(message, "**You Music Specify The Role**")
                if (!toogle) return embed.warn(message, "**You Music Specify The Toggle ['on', 'off']**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
                    if (!toogle == "on" || !toogle == "off") return embed.warn(message, "**only ['on', 'off'] words is allowed**")
                    db.set(`DJ_${message.guild.id}`, role.id);
                    db.set(`DJ_TOG_${message.guild.id}`, toogle);
                    embed.done(message, "The \`DJ\` Role Changed In **" + message.guild.name + "** to: <@&" + role.id + "> in `" + toogle + "` mode")
                } else embed.err(message, "**You Need To get adminstrator permissions**");
            } else if (lang == "ar") {
                if (!role) return embed.warn(message, "**يجب تعين رول الدي جاي**")
                if (!toogle) return embed.warn(message, "**يجب تعيل التوجل ['on', 'off']**")
                if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                    if (!toogle == "on" || !toogle == "off") return embed.warn(message, "**فقط الكلمات ['on', 'off'] مسموحه**")
                    db.set(`DJ_${message.guild.id}`, role.id);
                    db.set(`DJ_TOG_${message.guild.id}`, toogle);
                    embed.done(message, "تمت تغير رتبت ال \`DJ\` في **" + message.guild.name + "** لـ: <@&" + role.id + "> في وضع `" + toogle + "` mode")
                } else embed.err(message, "**يجب انت تحصل على صلحيات الأدمنستناتور**")
            }
        } catch {
            console.log('rexom')
        }
    }
};