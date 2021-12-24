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
  name: "skip",
  description: "Skip The Music",
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
        if (queue.songs.map((song, i) => i).length == 1)
          return embed.warn(interaction, "**Thare Are No Song To Skip**", "/");
        else {
          player.skip(interaction);
          embed.done(interaction, "**Music Has Skiped**", "/");
        }
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        if (queue.songs.map((song, i) => i).length == 1)
          return embed.warn(
            interaction,
            "**مفيش حاجه اسكب ليه هل ات عبيت**",
            "/"
          );
        else {
          player.skip(interaction);
          embed.done(interaction, "**تم تخطي الغنيه**", "/");
        }
      }
    } catch {
      console.log("rexom");
    }
  },
};
