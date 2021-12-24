const {
  Client,
  CommandInteraction,
  MessageEmbed,
  Message,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");

module.exports = {
  name: "play-playlist",
  description: "play your playlist",
  type: "CHAT_INPUT",
  options: [
    {
      name: "name",
      description: "the name of the playlist",
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
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      let lang = settings.lang;
      module.exports.interactionGET = interaction;
      let z = 0;
      let value = interaction.options.getString("name");
      let voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
      let data = db.fetch(`PlaylistsData_${interaction.user.id}`);
      if (data == null)
        (await db.set(`PlaylistsData_${interaction.user.id}`, [])) &&
          embed.warn(
            interaction,
            `**thare are no user cold \`${interaction.user.username}\`!.**`,
            "/"
          );
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.name == value) {
          z = 1;
          for (var i = 0; i < element.songs.length; i++) {
            (function (i) {
              setTimeout(function () {
                player.play(interaction, element.songs[i]);
              }, 3500 * i);
            })(i);
          }
        }
      }
      if (z == 1) {
        setTimeout(async () => {
          await embed.done(interaction, "you playlist is running!", "/");
        }, 1440);
      } else {
        setTimeout(async () => {
          await embed.err(interaction, "i can't find this playlist!", "/");
        }, 1440);
      }
    } catch {
      console.log("rexom");
    }
  },
};
