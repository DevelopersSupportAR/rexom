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
  name: "resume",
  description: "Resume The Music",
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
        if (queue.paused == false)
          return embed.warn(interaction, "**The Music Is Not Paused**", "/");
        player.resume(interaction);
        embed.done(interaction, "**Music Has Resumed**", "/");
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        if (queue.paused == false)
          return embed.warn(
            interaction,
            "**لم يتم ايقاف الموسيى اصلا انت بتعمل ايه**",
            "/"
          );
        player.resume(interaction);
        embed.done(interaction, "**تم أستكمال الموسيقى**", "/");
      }
    } catch {
      console.log("rexom");
    }
  },
};
