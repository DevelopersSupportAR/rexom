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
  name: "save-playlist",
  description: "save a playlist",
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
      let value = interaction.options.getString("name");
      let queue = player.getQueue(interaction);
      if (!queue) embed.notQueue(interaction, lang, "/");
      let voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
      let checkData = db.fetch(`PlaylistsData_${interaction.user.id}`);
      if (checkData !== null) {
        let i = 0;
        for (let index = 0; index < checkData.length; index++) {
          const element = checkData[index];
          if (element.name == value) {
            i = 1;
            let btn = new MessageButton()
              .setEmoji(emojis.done)
              .setCustomId("a")
              .setStyle("SUCCESS");
            let cancel = new MessageButton()
              .setEmoji(emojis.error)
              .setCustomId("c")
              .setStyle("DANGER");
            let row = new MessageActionRow().addComponents(btn, cancel);
            let filter = (i) => i.user.id == interaction.user.id;
            let msg = await interaction.followUp({
              content:
                emojis.warn +
                " | **you have a saved playlist with this name,\n you can't add two playlists with the same name but you can delete it!**",
              ephemeral: false,
              components: [row],
            });
            let collector = await msg.createMessageComponentCollector(filter, {
              time: 0,
            });

            collector.on("collect", async (i) => {
              i.deferReply({ ephemeral: true }).catch(() => {});
              if (i.customId == "a") {
                checkData.forEach((ps) => {
                  if (ps.name !== value)
                    db.push(`PlaylistsData_${interaction.user.id}`, ps);
                });
                return i.followUp({
                  content: emojis.done + " | **Playlist Has Removed**",
                  ephemeral: true,
                  components: [],
                });
              } else if (i.customId == "c") {
                return i.followUp({
                  content: emojis.done + " | **Playlist Is Still Working**",
                  ephemeral: true,
                  components: [],
                });
              }
            });
            return;
          }
        }
        await setTimeout(async () => {
          if (i !== 1) {
            let object = {
              name: value,
              creator: interaction.user.id,
              songs: [],
            };
            queue.songs.forEach((song) => {
              object.songs.push(`${song.url}`);
            });
            await db.push(`PlaylistsData_${interaction.user.id}`, object);
            embed.done(
              interaction,
              `**you have saved a new playlist on rexom cold \`${value}\`!**`,
              "/"
            );
          }
        }, 3500);
      } else
        (await db.set(`PlaylistsData_${interaction.user.id}`, [])) &&
          embed.warn(
            interaction,
            "**Your New Profile Has Setuped Please use the command again!.**",
            "/"
          );
    } catch {
      console.log("rexom");
    }
  },
};
