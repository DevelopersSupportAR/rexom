const { Client, Message, Guild, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require("../../../config/emojis.json");
const commands = require("../../index").commands;

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Give's You The Commands List",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */
  run: async (client, message, args, prefix, lang) => {
    try {
      const embed =
        //.setImage("https://camo.githubusercontent.com/d338bbe1d594c830f1f248d4dde6aa1b8c38c7c4ae7ede289ae9caf1d8f277bd/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3734333838303336333333313432303234312f3930323731313630393131323236343830342f756e6b6e6f776e2e706e67")
        new MessageEmbed()
          .setTitle(`Help Commands`)
          .setColor(0x2f3136)
          .setThumbnail(message.author.avatarURL({ dynamic: true }))
          .setAuthor(
            message.guild.name,
            message.guild.iconURL({ dynamic: true })
          )
          .setDescription(`**[reXom](https://github.com/DevelopersSupportAR/rexom.git)**, reXom give you server a toune 🎶\n
            Version: \`3.1.2\`
            Prefix: ${prefix}\n
            `);
      let keys = Array.from(commands.keys());
      console.log(keys);
      keys.forEach((key) => {
        let command = commands.get(key);
        embed.addFields({
          name: prefix + command.name,
          value: command.description || "no description",
          inline: true,
        });
      });
      message
        .reply({
          content: emojis.loading + " | processing command...",
          allowedMentions: {
            repliedUser: false,
          },
          ephemeral: true,
        })
        .then((msg) => {
          setTimeout(() => {
            msg.edit({
              content: emojis.done + " | processing complete!.",
              embeds: [embed],
              allowedMentions: {
                repliedUser: false,
              },
              ephemeral: true,
            });
          }, ms("1s"));
        });
    } catch (err) {
      console.log(err);
    }
  },
};
