const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Permissions,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const embed = require("../structures/embeds");

module.exports = {
  name: "lang",
  description: "Change The Bot Lang In The Guild",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "The new lang",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "en",
          value: "en",
        },
        {
          name: "ar",
          value: "ar",
        },
      ],
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      let lang = settings.lang;
      if (lang == "en") {
        if (
          interaction.member.permissions.has([
            Permissions.FLAGS.ADMINISTRATOR,
          ]) ||
          interaction.member.roles.cache.find(
            (role) => role.id == db.fetch(`DJ_${interaction.guild.id}`)
          )
        ) {
          if (!["en", "ar"].includes(interaction.options.getString("value")))
            return embed.warn(
              interaction,
              "**only ['ar', 'en'] lang is allowed**",
              "/"
            );
          db.set(`Settings_${interaction.guild.id}`, {
            prefix: settings.prefix,
            lang: interaction.options.getString("value"),
          });
          embed.done(
            interaction,
            "The Lang Has Changed In **" +
              interaction.guild.name +
              "** to: `" +
              interaction.options.getString("value") +
              "`",
            "/"
          );
        } else
          embed.err(
            interaction,
            '**You Need To Get "DJ" role or get adminstrator permissions**',
            "/"
          );
      } else if (lang == "ar") {
        if (
          interaction.member.permissions.has([
            Permissions.FLAGS.ADMINISTRATOR,
          ]) ||
          interaction.member.roles.cache.find(
            (role) => role.id == db.fetch(`DJ_${interaction.guild.id}`)
          )
        ) {
          if (!["en", "ar"].includes(interaction.options.getString("value")))
            return embed.done(
              interaction,
              "**فقط لغة ['ar', 'en'] مسموحه**",
              "/"
            );
          db.set(`Settings_${interaction.guild.id}`, {
            prefix: settings.prefix,
            lang: interaction.options.getString("value"),
          });
          embed.done(
            interaction,
            "تمت تغير لغة البوت في **" +
              interaction.guild.name +
              "** لـ: `" +
              interaction.options.getString("value") +
              "`",
            "/"
          );
        } else
          embed.err(
            interaction,
            '**يجب انت تحصل على رتبة "DJ" او صلحيات الأدمنستناتور**',
            "/"
          );
      }
    } catch {
      console.log("rexom");
    }
  },
};
