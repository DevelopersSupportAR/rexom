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
  name: "dj",
  description: "Set DJ Role",
  type: "CHAT_INPUT",
  options: [
    {
      name: "role",
      description: "the dj role",
      type: "ROLE",
      required: true,
    },
    {
      name: "toggle",
      description: "the dj role toggle",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "on",
          value: "on",
        },
        {
          name: "off",
          value: "off",
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
          interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])
        ) {
          if (
            !interaction.options.getString("toggle") == "on" ||
            !interaction.options.getString("toggle") == "off"
          )
            return embed.warn(
              interaction,
              `**only ['on', 'off'] words is allowed**`,
              "/"
            );
          db.set(
            `DJ_${interaction.guild.id}`,
            interaction.options.getRole("role").id
          );
          db.set(
            `DJ_TOG_${interaction.guild.id}`,
            interaction.options.getString("toggle")
          );
          embed.done(
            interaction,
            "The `DJ` Role Changed In **" +
              interaction.guild.name +
              "** to: <@&" +
              interaction.options.getRole("role").id +
              "> in `" +
              interaction.options.getString("toggle") +
              "` mode",
            "/"
          );
        } else
          return embed.err(
            interaction,
            `**You Need To get adminstrator permissions**`,
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
          if (
            !interaction.options.getString("toggle") == "on" ||
            !interaction.options.getString("toggle") == "off"
          )
            return embed.warn(
              interaction,
              `**فقط الكلمات ['on', 'off'] مسموحه**`
            );
          db.set(
            `DJ_${interaction.guild.id}`,
            interaction.options.getRole("role").id
          );
          db.set(
            `DJ_TOG_${interaction.guild.id}`,
            interaction.options.getString("toggle")
          );
          embed.done(
            interaction,
            "تمت تغير رتبت ال `DJ` في **" +
              interaction.guild.name +
              "** لـ: <@&" +
              interaction.options.getRole("role").id +
              "> في وضع `" +
              interaction.options.getString("toggle") +
              "` mode",
            "/"
          );
        } else
          return embed.err(
            interaction,
            "**يجب انت تحصل على صلحيات الأدمنستناتور**",
            "/"
          );
      }
    } catch {
      console.log("rexom");
    }
  },
};
