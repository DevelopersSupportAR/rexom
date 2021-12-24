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
  name: "jump",
  description: "skip a specific song",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "The Song Number On The Queue",
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
      if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        try {
          player.jump(
            interaction,
            parseInt(interaction.options.getNumber("value"))
          );
        } catch (err) {
          embed.err(
            interaction,
            "**هذا الرقم غير ملحق في طابور عرض السيرفر**",
            "/"
          );
        }
        embed.done(
          interaction,
          `تم القفظ الى الأغنيه صاحبة الرقم: \`${parseInt(
            interaction.options.getNumber("value")
          )}\``,
          "/"
        );
      } else if (lang == "en") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        try {
          player.jump(
            interaction,
            parseInt(interaction.options.getNumber("value"))
          );
        } catch (err) {
          embed.err(
            interaction,
            "**the bot can't find this song number on the server queue**",
            "/"
          );
          throw err;
        }
        embed.done(
          interaction,
          `**done jumped to song number \`${parseInt(
            interaction.options.getNumber("value")
          )}**`,
          "/"
        );
      }
    } catch {
      console.log("rexom");
    }
  },
};
