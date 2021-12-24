const { Client, MessageEmbed, Message } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message, results) => {
  try {
    let lang =
      require("../slashCommands/play").guildLANG ||
      require("../commands/play").guildLANG;
    if (lang == "en") {
      let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          results
            .map(
              (song, i) =>
                `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join("\n")
        )
        .setFooter("You have 5m To Choose A Song!.");
      message.channel
        .send({
          content: "📜 | **Choose Song From Down Blow!.**",
          embeds: [embed],
          allowedMentions: {
            repliedUser: false,
          },
        })
        .then(async function (msg) {
          require("quick.db").set(`Delete_${message.channel.id}`, msg.id);
        });
    } else if (lang == "ar") {
      let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          results
            .map(
              (song, i) =>
                `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``
            )
            .join("\n")
        )
        .setFooter("لديك 5د لأختيرا أغنيه!.");
      message.channel
        .send({
          content: "📜 | **قم بأختيار أغنية من الأسفل!.**",
          embeds: [embed],
          allowedMentions: {
            repliedUser: false,
          },
        })
        .then(async function (msg) {
          require("quick.db").set(`Delete_${message.channel.id}`, msg.id);
        });
    }
  } catch {
    console.log("rexom");
  }
};
