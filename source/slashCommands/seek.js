const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
const { player } = require("../index");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const embed = require("../structures/embeds");

module.exports = {
  name: "seek",
  description: "Skips to the specified timestamp in the track",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "the timestamp",
      type: "NUMBER",
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
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.seek(
          interaction,
          Number(interaction.options.getNumber("value"))
        );
        embed.done(
          interaction,
          `**seeked to** \`${interaction.options.getNumber("value")}\``,
          "/"
        );
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.seek(
          interaction,
          Number(interaction.options.getNumber("value"))
        );
        embed.done(
          interaction,
          `**تم الأقتصاص الى:** \`${interaction.options.getNumber("value")}\``,
          "/"
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
