const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require("../../config/emojis.json");

module.exports = {
  name: "help",
  description: "See Bot Commands",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      const prefix = "/";
      const embed = new MessageEmbed()
        .setTitle(`Help Commands`)
        .setColor(0x2f3136)
        .setAuthor(interaction.guild.name, interaction.guild.iconURL())
        .setDescription(`**[reXom](https://github.com/DevelopersSupportAR/rexom.git)**, Play your favorite playlist with ReXom 🎶
            Version: \`2.8.2\`
            Prefix: ${prefix}
            `);
      require("fs").readdir(__dirname + "/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
          if (!file.endsWith(".js")) return;
          let props = require(__dirname + "/" + file);
          embed.addFields({
            name: prefix + props.name,
            value: props.description || "0",
            inline: true,
          });
        });
      });
      interaction
        .followUp({
          content: emojis.loading + " | processing command...",
          ephemeral: true,
          allowedMentions: { repliedUser: false },
        })
        .then(() => {
          setTimeout(() => {
            interaction.editReply({
              content: emojis.done + " | processing complete!.",
              embeds: [embed],
              ephemeral: true,
              allowedMentions: { repliedUser: false },
            });
          }, ms("1s"));
        });
    } catch {
      console.log("rexom");
    }
  },
};
