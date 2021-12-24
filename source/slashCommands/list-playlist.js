const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");

module.exports = {
  name: "list-playlist",
  description: "preview all your playlists",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      let data = db.fetch(`PlaylistsData_${interaction.user.id}`);
      if (data == null)
        return (
          (await db.set(`PlaylistsData_${interaction.user.id}`, [])) &&
          require("../structures/embeds").warn(
            interaction,
            `**thare are no user cold \`${interaction.user.username}\`!.**`,
            "/"
          )
        );
      let embed = new MessageEmbed()
        .setAuthor(
          interaction.user.username + " Playlists",
          interaction.user.avatarURL({ dynamic: true })
        )
        .setColor(colors.loading);
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.name == "" || element.name == undefined) continue;
        embed.addFields({
          name: element.name + "_ _",
          value: element.songs
            .map((v, i, a) => `[**${i} - ${v}**](${v})`)
            .join("\n"),
        });
      }
      interaction.followUp({ embeds: [embed] });
    } catch {
      console.log("rexom");
    }
  },
};
