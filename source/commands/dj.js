const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

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
        let toogle = args[2];
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (lang == "en") {
            if (!role) return message.reply({
                content: emojis.error + ` | You Music Specify The Role`,
                ephemeral: true,
                allowedMentions: false
            });
            if (!toogle) return message.reply({
                content: emojis.error + ` | You Music Specify The Toggle ['on', 'off']`,
                ephemeral: true,
                allowedMentions: false
            });
            if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
                if (!toogle == "on" || !toogle == "off") return message.reply({
                    content: emojis.error + ` | only ['on', 'off'] words is allowed`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`DJ_${message.guild.id}`, role.id);
                db.set(`DJ_TOG_${message.guild.id}`, toogle);
                message.reply({
                    content: emojis.done + " | The \`DJ\` Role Changed In **" + message.guild.name + "** to: <@&" + role.id + "> in `" + toogle + "` mode",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + ` | You Need To get adminstrator permissions`,
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            if (!role) return message.reply({
                content: emojis.error + ` | يجب تعين رول الدي جاي`,
                ephemeral: true,
                allowedMentions: false
            });
            if (!toogle) return message.reply({
                content: emojis.error + ` | يجب تعيل التوجل ['on', 'off']`,
                ephemeral: true,
                allowedMentions: false
            });
            if (message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.member.roles.cache.find(role => role.id == db.fetch(`DJ_${message.guild.id}`))) {
                if (!toogle == "on" || !toogle == "off") return message.reply({
                    content: emojis.error + ` | فقط الكلمات ['on', 'off'] مسموحه`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`DJ_${message.guild.id}`, role.id);
                db.set(`DJ_TOG_${message.guild.id}`, toogle);
                message.reply({
                    content: emojis.done + " | تمت تغير رتبت ال \`DJ\` في **" + message.guild.name + "** لـ: <@&" + role.id + "> في وضع `" + toogle + "` mode",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + ` | يجب انت تحصل على صلحيات الأدمنستناتور`,
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};