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
  name: "stop",
  description: "Stop The Music",
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
      if (lang == "en") {
        module.exports.guildID = interaction.guild.id;
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.stop(interaction);
        embed.done(interaction, "**The Music Has Stoped**", "/");
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.stop(interaction);
        embed.done(interaction, "**تم ايقاف الموسقى**", "/");
      }
    } catch {
      console.log("rexom");
    }
  },
};
