const { Client, MessageEmbed, Message } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message, answer, query) => {
  try {
    let lang =
      require("../slashCommands/play").guildLANG ||
      require("../commands/play").guildLANG;
    let msg = require("quick.db").fetch(`Delete_${message.channel.id}`);
    if (lang == "en") {
      message.channel.messages.fetch(msg).then((m) =>
        m.edit({
          content: `🎶 | **Choosed: \`${answer}\`!.**`,
          embeds: [],
          allowedMentions: {
            repliedUser: false,
          },
        })
      );
    } else if (lang == "ar") {
      message.channel.messages.fetch(msg).then((m) =>
        m.edit({
          content: `🎶 | **تم أختيار الخيار: \`${answer}\`!.**`,
          embeds: [],
          allowedMentions: {
            repliedUser: false,
          },
        })
      );
    }
  } catch {
    console.log("rexom");
  }
};
