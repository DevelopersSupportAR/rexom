const {
  Client,
  CommandInteraction,
  MessageSelectMenu,
  MessageActionRow,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");

module.exports = {
  name: "filter",
  description: "songs filters",
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
      if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        let selector = new MessageSelectMenu()
          .setCustomId("select")
          .setMaxValues(1)
          .setMinValues(1);
        [
          "3d",
          "bassboost",
          "echo",
          "karaoke",
          "nightcore",
          "vaporwave",
          "flanger",
          "gate",
          "haas",
          "reverse",
          "surround",
          "mcompand",
          "phaser",
          "tremolo",
          "earwax",
        ].forEach((filter) => {
          selector.addOptions([
            {
              label: filter,
              value: filter,
              description: "_ _",
              emoji: "🎙️",
            },
          ]);
        });
        let row = new MessageActionRow().addComponents(selector);
        interaction
          .followUp({
            content: "رجى اختيار الفيلتر المناسب.",
            allowedMentions: {
              repliedUser: false,
            },
            embeds: [],
            components: [row],
          })
          .then(async (msg) => {
            let filter = (i) => i.user.id == interaction.user.id;
            let collector = await msg.createMessageComponentCollector({
              filter,
              time: 0,
              max: 1,
            });
            collector.on("collect", (i) => {
              let filter = i.values[0];
              player.setFilter(interaction, filter);
              interaction.editReply({
                content: `**تم تغير فلتر الصوت الخاص بطابور العرض الى \`${filter}\`**`,
                allowedMentions: {
                  repliedUser: false,
                },
                embeds: [],
                components: [],
              });
            });
          });
      } else if (lang == "en") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        let selector = new MessageSelectMenu()
          .setCustomId("select")
          .setMaxValues(1)
          .setMinValues(1);
        [
          "3d",
          "bassboost",
          "echo",
          "karaoke",
          "nightcore",
          "vaporwave",
          "flanger",
          "gate",
          "haas",
          "reverse",
          "surround",
          "mcompand",
          "phaser",
          "tremolo",
          "earwax",
        ].forEach((filter) => {
          selector.addOptions([
            {
              label: filter,
              value: filter,
              description: "_ _",
              emoji: "🎙️",
            },
          ]);
        });
        let row = new MessageActionRow().addComponents(selector);
        interaction
          .followUp({
            content: "please choose your filter.",
            allowedMentions: {
              repliedUser: false,
            },
            embeds: [],
            components: [row],
          })
          .then(async (msg) => {
            let filter = (i) => i.user.id == interaction.user.id;
            let collector = await msg.createMessageComponentCollector({
              filter,
              time: 0,
              max: 1,
            });
            collector.on("collect", (i) => {
              let filter = i.values[0];
              player.setFilter(interaction, filter);
              interaction.editReply({
                content: `**queue filter has been changed to \`${filter}\`**`,
                allowedMentions: {
                  repliedUser: false,
                },
                embeds: [],
                components: [],
              });
            });
          });
      }
    } catch {
      console.log("rexom");
    }
  },
};
