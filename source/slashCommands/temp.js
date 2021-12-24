const { Client, CommandInteraction, Permissions } = require("discord.js");
const emojis = require("../../config/emojis.json");
const embed = require("../structures/embeds");

module.exports = {
  name: "temp",
  description: "Create An Template Voice Channels System",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]))
        return embed.err(
          interaction,
          "you don't have the full permissions to use this command",
          "/"
        );
      interaction.guild.channels
        .create("Temp Channels", {
          type: "GUILD_CATEGORY",
          reason: "Temp On!",
        })
        .then((c) => {
          interaction.guild.channels
            .create("Click Here", {
              type: "GUILD_VOICE",
              reason: "Temp On!",
              rateLimitPerUser: 1,
              userLimit: 1,
            })
            .then((v) => {
              v.setParent(c.id);
              const TempChannels = require("discord-temp-channels");
              const tempChannels = new TempChannels(client);

              tempChannels.registerChannel(v.id, {
                childCategory: c.id,
                childAutoDeleteIfEmpty: true,
                childFormat: (member, count) =>
                  `#${count} | ${member.user.username}`,
              });
            });
        });
      embed.done(
        interaction,
        "temp channels system has ben created in **" +
          interaction.guild.name +
          "**",
        "/"
      );
    } catch {
      console.log("rexom");
    }
  },
};
