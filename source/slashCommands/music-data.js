const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const db = require("quick.db");
const { player } = require("../index");
const colors = require("../../config/colors.json");
const embed = require("../structures/embeds");

module.exports = {
  name: "music-data",
  description: "get all the playing music data",
  type: "CHAT_INPUT",

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
      let queue = player.getQueue(interaction);
      if (!queue) return embed.notQueue(interaction, lang, "/");
      let value = queue.songs.map((v, i, a) => v).slice(0, 1)[0];
      if (!value)
        return embed.err(interaction, "this song number is not exiest", "/");
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(colors.done)
            .setDescription(`\`\`\`\n${value.name}\n\`\`\``)
            .addField("Liks 👍", `${value.likes}` || "null", true)
            .addField("Diliks 👎", `${value.dislikes}` || "null", true)
            .addField(
              "Duration 🕙",
              `${value.formattedDuration}` || "null",
              true
            )
            .addField("isLive 📹", `${value.isLive}` || "false", true)
            .addField("Requester 👥", `${value.user.tag}` || "null", true)
            .addField("Song repost count ➿", `${value.reposts}` || "0", true)
            .addField("Song source 👑", `${value.source}` || "null", true)
            .addField(
              "stramURL 🥌",
              `[Here](${value.streamURL ? value.streamURL : value.url})`,
              true
            )
            .addField("URL ➰", `[Here](${value.url})`, true)
            .addField("Views 👀", `${value.views}`, true)
            .addField(
              "Uploader 🧗",
              `[${value.uploader.name}](${value.uploader.url})`,
              true
            )
            .addField(
              "Related songs 🎶",
              value.related
                .map((v, i, a) => `[${v.name}](${v.url})` || "null")
                .slice(0, 5)
                .join("\n-") || "null",
              true
            )
            .setImage(
              value.thumbnail || client.user.avatarURL({ dynamic: true })
            ),
        ],
      });
    } catch {
      console.log("rexom");
    }
  },
};
