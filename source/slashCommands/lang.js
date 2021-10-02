const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "lang",
    description: "Change The Bot Lang In The Guild",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "The new lang ['en', 'ar']",
        type: "STRING",
        required: true
    }],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "en") {
            if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.roles.cache.find(role => role.id == db.fetch(`DJ_${interaction.guild.id}`))) {
                if (!["en", "ar"].includes(interaction.options.getString("value"))) return interaction.followUp({
                    content: emojis.error + ` | only ['ar', 'en'] lang is allowed`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`Settings_${interaction.guild.id}`, {
                    prefix: settings.prefix,
                    lang: interaction.options.getString("value")
                });
                interaction.followUp({
                    content: emojis.done + " | The Lang Has Changed In **" + interaction.guild.name + "** to: `" + interaction.options.getString("value") + "`",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + ` | You Need To Get \"DJ\" role or get adminstrator permissions`,
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.roles.cache.find(role => role.id == db.fetch(`DJ_${interaction.guild.id}`))) {
                if (!["en", "ar"].includes(interaction.options.getString("value"))) return interaction.followUp({
                    content: emojis.error + ` | فقط لغة ['ar', 'en'] مسموحه`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`Settings_${interaction.guild.id}`, {
                    prefix: settings.prefix,
                    lang: interaction.options.getString("value")
                });
                interaction.followUp({
                    content: emojis.done + " | تمت تغير لغة البوت في **" + interaction.guild.name + "** لـ: `" + interaction.options.getString("value") + "`",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + ` | يجب انت تحصل على رتبة \"DJ\" او صلحيات الأدمنستناتور`,
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};