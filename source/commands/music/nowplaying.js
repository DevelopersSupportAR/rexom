const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const { player } = require("../../index");
const embeds = require("../../structures/embeds");

module.exports = {
  name: "nowplaying",
  aliases: [],
  description: "What is paying",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      module.exports.guildID = message.guild.id;
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        embeds.notInVoice(message, lang);
        return;
      }
      const queue = player.getQueue(message);
      if (!queue) return embeds.notQueue(message, lang);
      let track = queue.songs[0];
      if (track) {
        const result = new MessageEmbed()
          .setColor("YELLOW")
          .setImage(
            track.Thumbnail ||
              "https://media.discordapp.net/attachments/743880363331420241/902711609112264804/unknown.png"
          )
          .setDescription(
            `${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${
              track.name
            } \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``
          )
          .setThumbnail(message.guild.iconURL({ dynamic: true }));
        message.channel
          .send({
            embeds: [result],
            ephemeral: false,
            allowedMentions: {
              repliedUser: false,
            },
          })
          .catch((err) => {
            console.log(" ");
          });
      }
    } catch {
      console.log("rexom");
    }
  },
};
