const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");

module.exports = {
  name: "volume",
  description: "Controle Volume The Music",
  type: "CHAT_INPUT",
  options: [
    {
      name: "number",
      description: "The New Volume Number",
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
        module.exports.guildID = interaction.guild.id;
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.setVolume(
          interaction,
          Number(interaction.options.getNumber("number") || 100)
        );
        embed.done(
          interaction,
          "**Music Volume Has Changed To: **" +
            interaction.options.getNumber("number") || 100,
          "/"
        );
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.setVolume(
          interaction,
          Number(interaction.options.getNumber("number") || 100)
        );
        embed.done(
          interaction,
          "**تم تغير مستوى الصوت الى: **" +
            interaction.options.getNumber("number") || 100,
          "/"
        );
      }
    } catch {
      console.log("rexom");
    }
  },
};
