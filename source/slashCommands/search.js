const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const { player } = require("../index");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const embed = require("../structures/embeds");

module.exports = {
  name: "search",
  description: "Search For Music",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "the word that the bot will search on it",
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
      module.exports.interactionGET = interaction;
      module.exports.noMessage = "off";
      let settings = db.fetch(`Settings_${interaction.guild.id}`);
      let lang = settings.lang;
      try {
        let value = interaction.options.getString("value");
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
        player
          .search(value, {
            limit: 20,
            type: "video",
            safeSearch: false,
          })
          .then(async (results) => {
            let selcetor = new MessageSelectMenu()
              .setCustomId("select")
              .setMaxValues(1)
              .setMinValues(1);
            results
              .map((song, i) =>
                selcetor.addOptions([
                  {
                    label: `${String(song.name)}`,
                    value: String(i),
                    description: `${song.formattedDuration}`,
                    emoji: "🎶",
                  },
                ])
              )
              .join("\n");
            let row = new MessageActionRow().addComponents(selcetor);
            let msg = await interaction.followUp({
              content: "please choose on of this songs in the menu!",
              components: [row],
              ephemeral: false,
              allowedMentions: {
                repliedUser: false,
              },
            });
            let filter = (i) => i.user.id == interaction.user.id;
            let collector =
              await interaction.channel.createMessageComponentCollector({
                filter,
                time: 0,
                max: 1,
              });
            collector.on("collect", async (collected) => {
              player.play(interaction, results[collected.values[0]]?.url);
              interaction
                .editReply({
                  content: "Playing audio..",
                  embeds: [
                    new MessageEmbed()
                      .setColor("GREEN")
                      .setDescription(
                        `🎶 | **__[${results[collected.values[0]]?.name}](${
                          results[collected.values[0]]?.url
                        })__ Is Playing**\n**📽️ | Music Made By: [${
                          results[collected.values[0]]?.uploader.name
                        }](${results[collected.values[0]]?.uploader.url})**`
                      ),
                  ],
                  components: [],
                  ephemeral: false,
                  allowedMentions: {
                    repliedUser: false,
                  },
                })
                .then(async (msg) => {
                  msg.react("⏯️");
                  msg.react("⏹️");
                  msg.react("🔄");
                  let filter2 = (reaction, user) =>
                    user.id == interaction.user.id;
                  let emcoll = await msg.createReactionCollector({
                    filter2,
                    time: 0,
                  });
                  emcoll.on("collect", async (reaction, user) => {
                    if (user.partial) await user.fetch();
                    if (reaction.partial) await reaction.fetch();
                    if (reaction.message.partial)
                      await reaction.message.fetch();
                    if (user.bot) return;
                    let queue = player.getQueue(interaction);
                    if (reaction.emoji.name == "⏯️") {
                      reaction.users.remove(user.id);
                      if (queue) {
                        try {
                          if (queue.paused == true) player.resume(interaction);
                          else player.pause(interaction);
                        } catch (err) {
                          console.log();
                        }
                      }
                    } else if (reaction.emoji.name == "⏹️") {
                      try {
                        interaction
                          .editReply({
                            content: emojis.error + " | This Trak Has Closed!.",
                            embeds: [],
                            ephemeral: false,
                            allowedMentions: {
                              repliedUser: false,
                            },
                          })
                          .then((msg) => {
                            msg.reactions.removeAll();
                          });
                        reaction.users.remove(user.id);
                        player.stop(interaction);
                      } catch (err) {
                        console.log();
                      }
                    } else if (reaction.emoji.name == "🔄") {
                      try {
                        reaction.users.remove(user.id);
                        if (queue) {
                          if (queue.repeatMode == 0)
                            player.setRepeatMode(interaction, parseInt(1));
                          if (queue.repeatMode == 1)
                            player.setRepeatMode(interaction, parseInt(0));
                        }
                      } catch (err) {
                        console.log();
                      }
                    }
                  });
                });
            });
          });
      } catch {
        console.log("rexom");
      }
    } catch {
      console.log("rexom");
    }
  },
};
