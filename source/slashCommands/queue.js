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
  name: "queue",
  description: "Preview The Server Queue",
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
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                `Server Queue`,
                client.user.avatarURL({ dynamic: true }),
                `https://discord.gg/developer-support`
              )
              .setColor("YELLOW")
              .setDescription(
                `__Now Playing:__\n${queue.songs
                  .map(
                    (song, id) =>
                      `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``
                  )
                  .slice(0, 1)
                  .join("\n")}\n\n__Up Next:__\n${queue.songs
                  .map(
                    (song, id) =>
                      `**${id + 1}**. **[${song.name}](${song.url})** | \`${
                        song.formattedDuration
                      }\` | \`Requested By: ${song.user.tag}\``
                  )
                  .slice(1, 10)
                  .join("\n")}`
              ),
          ],
          allowedMentions: {
            repliedUser: false,
          },
          ephemeral: true,
        });
      } else if (lang == "ar") {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        const queue = player.getQueue(interaction);
        if (!queue) return embed.notQueue(interaction, lang, "/");
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                `Server Queue`,
                client.user.avatarURL({ dynamic: true }),
                `https://discord.gg/developer-support`
              )
              .setColor("YELLOW")
              .setDescription(
                `__Now Playing:__\n${queue.songs
                  .map(
                    (song, id) =>
                      `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``
                  )
                  .slice(0, 1)
                  .join("\n")}\n\n__Up Next:__\n${queue.songs
                  .map(
                    (song, id) =>
                      `**${id + 1}**. **[${song.name}](${song.url})** | \`${
                        song.formattedDuration
                      }\` | \`Requested By: ${song.user.tag}\``
                  )
                  .slice(1, 10)
                  .join("\n")}`
              ),
          ],
          allowedMentions: {
            repliedUser: false,
          },
          ephemeral: true,
        });
      }
    } catch {
      console.log("rexom");
    }
  },
};
