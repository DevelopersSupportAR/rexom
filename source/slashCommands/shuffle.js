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
  name: "shuffle",
  description: "Randomizes the queue",
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
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.shuffle(interaction);
        embed.done(interaction, "**server queue has shuffled**", "/");
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        player.shuffle(interaction);
        embed.done(interaction, "**تمت اعادة ترتيب قائمة التشغيل**", "/");
      }
    } catch {
      console.log("rexom");
    }
  },
};
