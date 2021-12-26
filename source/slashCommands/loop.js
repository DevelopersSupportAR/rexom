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
  name: "loop",
  description: "Loop Queue/Song",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "The Loop Mode Type",
      type: "STRING",
      required: false,
      choices: [
        {
          name: "off",
          value: "off",
        },
        {
          name: "repeat song",
          value: "repeat song",
        },
        {
          name: "repeat queue",
          value: "repeat queue",
        },
      ],
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
        var mode = interaction.options.getString("value");
        var modeler;
        if (mode == "off") modeler = 0;
        else if (mode == "repeat song") modeler = 1;
        else if (mode == "repeat queue") modeler = 2;
        else
          return embed.warn(
            interaction,
            "**you have to type the repeating mode type like <off/repeat song/repeat queue>**",
            "/"
          );
        player.setRepeatMode(interaction, parseInt(modeler));
        embed.done(interaction, `**تم تغير وضع التكرار الي: \`${mode}\`**`, "/");
      } else if (lang == "en") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        var mode = interaction.options.getString("value") || "repeat song";
        var modeler;
        if (mode == "off") modeler = 0;
        else if (mode == "repeat song") modeler = 1;
        else if (mode == "repeat queue") modeler = 2;
        else
          return embed.warn(
            interaction,
            "**you have to type the repeating mode type like <off/repeat song/repeat queue>**",
            "/"
          );
        player.setRepeatMode(interaction, parseInt(modeler));
        embed.done(
          interaction,
          `**repeating mode has changed to: \`${mode}\`**`, "/"
        );
      }
    } catch {
      console.log("rexom");
    }
  },
};
