const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
const { player } = require("../index");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const embed = require("../structures/embeds");

module.exports = {
  name: "search",
  aliases: [],
  description: "Make The Bot Say Any Thing",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      module.exports.messageGET = message;
      module.exports.noMessage = "off";
      let value = message.content.split(" ").slice(1).join(" ");
      if (!value)
        return embed.warn(message, "**please type the song name/url**");
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return embed.notInVoice(message, lang);
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
          let msg = await message.reply({
            content: "please choose on of this songs in the menu!",
            components: [row],
            ephemeral: false,
            allowedMentions: {
              repliedUser: false,
            },
          });
          let filter = (i) => i.user.id == message.author.id;
          let collector = await message.channel.createMessageComponentCollector(
            {
              filter,
              time: 0,
              max: 1,
            }
          );
          collector.on("collect", async (collected) => {
            player.play(message, results[collected.values[0]]?.url);
            msg
              .edit({
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
                let filter2 = (reaction, user) => user.id == message.author.id;
                let emcoll = await msg.createReactionCollector({
                  filter2,
                  time: 0,
                });
                emcoll.on("collect", async (reaction, user) => {
                  if (user.partial) await user.fetch();
                  if (reaction.partial) await reaction.fetch();
                  if (reaction.message.partial) await reaction.message.fetch();
                  if (user.bot) return;
                  let queue = player.getQueue(message);
                  if (reaction.emoji.name == "⏯️") {
                    reaction.users.remove(user.id);
                    if (queue) {
                      try {
                        if (queue.paused == true) player.resume(message);
                        else player.pause(message);
                      } catch (err) {
                        console.log();
                      }
                    }
                  } else if (reaction.emoji.name == "⏹️") {
                    try {
                      msg
                        .edit({
                          content: emojis.error + " | This Trak Has Closed!.",
                          embeds: [],
                          ephemeral: true,
                          allowedMentions: {
                            repliedUser: false,
                          },
                        })
                        .then((msg) => {
                          msg.reactions.removeAll();
                        });
                      reaction.users.remove(user.id);
                      player.stop(message);
                    } catch (err) {
                      console.log();
                    }
                  } else if (reaction.emoji.name == "🔄") {
                    try {
                      reaction.users.remove(user.id);
                      if (queue) {
                        if (queue.repeatMode == 0)
                          player.setRepeatMode(message, parseInt(1));
                        if (queue.repeatMode == 1)
                          player.setRepeatMode(message, parseInt(0));
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
  },
};
