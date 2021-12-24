const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
} = require("@discordjs/voice");
const tts = require("google-tts-api");
const embed = require("../structures/embeds");

module.exports = {
  name: "say",
  description: "Make The Bot Say Any Thing",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "the word that the bot will say",
      type: "STRING",
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
      let value = interaction.options.getString("value");
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      let lang = settings.lang;
      if (lang == "en") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        connection;
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });
        const resource = createAudioResource(
          tts.getAudioUrl(value, {
            lang: "en",
            slow: false,
            host: "https://translate.google.com",
          })
        );
        player.play(resource);
        connection.subscribe(player);
        interaction.followUp({
          content: emojis.done,
          allowedMentions: { repliedUser: false },
          ephemeral: false,
        });
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        connection;
        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });
        const resource = createAudioResource(
          tts.getAudioUrl(value, {
            lang: "ar",
            slow: false,
            host: "https://translate.google.com",
          })
        );
        player.play(resource);
        connection.subscribe(player);
        interaction.followUp({
          content: emojis.done,
          allowedMentions: { repliedUser: false },
          ephemeral: false,
        });
      }
    } catch {
      console.log("rexom");
    }
  },
};
