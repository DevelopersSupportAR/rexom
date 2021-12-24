const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");
("");

module.exports = {
  name: "filter",
  aliases: ["set-filter"],
  description: "songs filters",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      if (lang == "ar") {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) embed.notInVoice(message, lang);
        const queue = player.getQueue(message);
        if (!queue) return embed.notQueue(message, lang);
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
        message
          .reply({
            content: "رجى اختيار الفيلتر المناسب.",
            allowedMentions: {
              repliedUser: false,
            },
            embeds: [],
            components: [row],
          })
          .then(async (msg) => {
            let filter = (i) => i.user.id == message.user.id;
            let collector = await msg.createMessageComponentCollector({
              filter,
              time: 0,
              max: 1,
            });
            collector.on("collect", (i) => {
              let filter = i.values[0];
              player.setFilter(message, filter);
              msg.edit({
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
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) embed.notInVoice(message, lang);
        const queue = player.getQueue(message);
        if (!queue) return embed.notQueue(message, lang);
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
        message
          .reply({
            content: "please choose your filter.",
            allowedMentions: {
              repliedUser: false,
            },
            embeds: [],
            components: [row],
          })
          .then(async (msg) => {
            let filter = (i) => i.user.id == message.user.id;
            let collector = await msg.createMessageComponentCollector({
              filter,
              time: 0,
              max: 1,
            });
            collector.on("collect", (i) => {
              let filter = i.values[0];
              player.setFilter(message, filter);
              msg.edit({
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
