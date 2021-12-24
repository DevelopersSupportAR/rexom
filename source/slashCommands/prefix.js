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
  name: "prefix",
  description: "Change The Bot Prefix In The Guild",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "The new prefix",
      type: "STRING",
      required: true,
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
          db.set(`Settings_${interaction.guild.id}`, {
            prefix: interaction.options.getString("value"),
            lang: settings.lang,
          });
          embed.done(
            interaction,
            "The Prefix Has Changed In **" +
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
          db.set(`Settings_${interaction.guild.id}`, {
            prefix: interaction.options.getString("value"),
            lang: settings.lang,
          });
          embed.done(
            interaction,
            "تمت تغير برفكس البوت في **" +
              interaction.guild.name +
              "** لـ: `" +
              interaction.options.getString("value") +
              "`",
            "/"
          );
        } else
          embed.err(
            interaction,
            'يجب انت تحصل على رتبة "DJ" او صلحيات الأدمنستناتور',
            "/"
          );
      }
    } catch {
      console.log("rexom");
    }
  },
};
