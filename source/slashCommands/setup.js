const { Client, CommandInteraction, MessageEmbed, Message, Permissions } = require("discord.js");
const { Song } = require('distube')
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
  name: "setup",
  description: "Setup A Music Collector Channel",
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   * @param {Song} song
   */

  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.followUp({ content: emojis.error })
    interaction.guild.channels.create('rexom-🎶', {
      type: "GUILD_TEXT",
      topic: "Play your favorite playlist with ReXom :notes:"
    }).then(async channel => {
      interaction.followUp({ content: emojis.done + " | **reXom Channel Has Setup Here**: <#" + channel.id + ">", ephemeral: true });
      channel.send({
        embeds: [
          new MessageEmbed()
            .setAuthor("No song playing currently")
            .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
        ],
      }).then(async msg => {
        msg.react('⏹️')
        msg.react('⏭️')
        msg.react('⏯️')
        msg.react('🔄')
        msg.react('🔀')
        msg.react('🔉')
        msg.react('🔊')
        let filter = m => m.content.length > 0;
        let collector = await channel.createMessageCollector({ filter, time: 0 });
        collector.on("collect", async (collected) => {
          if (collected.author.bot) return;
          if (!collected.member.voice.channel) return collected.reply({ content: emojis.error + ' | please join a voice channel first!' })
          collected.delete()
          player.play(interaction, collected.content).then(() => {
            setTimeout(() => {
              msg.edit({
                embeds: [
                  new MessageEmbed()
                    .setAuthor(require('../music/playSong').song.name || "No song playing currently")
                    .setImage(require('../music/playSong').song.thumbnail || "https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                ],
              });
            }, 2000);
          });
        });
        let filter2;
        let emcoll = await msg.createReactionCollector({ filter2, time: 0 });
        emcoll.on("collect", async (reaction, user) => {
          //if (!interaction.guild.members.cache.get(user.id).voice.channel) user.followUp({ content: emojis.error + ' | please join a voice channel first!' })
          if (user.partial) await user.fetch();
          if (reaction.partial) await reaction.fetch();
          if (reaction.message.partial) await reaction.message.fetch();
          if (user.bot) return;
          let queue = player.getQueue(interaction);
          if (reaction.emoji.name == "⏯️") {
            reaction.users.remove(user.id)
            if (queue) {
              if (queue.paused == true) player.resume(interaction)
              else player.pause(interaction)
            }
          } else if (reaction.emoji.name == "⏹️") {
            try {
              msg.edit({
                embeds: [
                  new MessageEmbed()
                    .setAuthor("No song playing currently")
                    .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                ],
              });
              reaction.users.remove(user.id)
              player.stop(interaction)
            } catch {
              console.log('')
            }
          } else if (reaction.emoji.name == "⏭️") {
            try {
              if (queue) {
                reaction.users.remove(user.id)
                if (queue.songs.map((song, i) => i).length == 1) return
                setTimeout(() => {
                  msg.edit({
                    embeds: [
                      new MessageEmbed()
                        .setAuthor(require('../music/playSong').song.name || "No song playing currently")
                        .setImage(require('../music/playSong').song.thumbnail || "https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                    ],
                  });
                }, 2000);
                player.skip(interaction)
              }
            } catch {
              console.log('')
            }
          } else if (reaction.emoji.name == "🔄") {
            try {
              reaction.users.remove(user.id)
              if (queue) {
                if (queue.repeatMode == 0) player.setRepeatMode(interaction, parseInt(1))
                if (queue.repeatMode == 1) player.setRepeatMode(interaction, parseInt(0))
              }
            } catch {
              console.log('')
            }
          } else if (reaction.emoji.name == "🔀") {
            try {
              reaction.users.remove(user.id)
              if (queue) {
                player.shuffle(interaction)
              }
            } catch {
              console.log('')
            }
          } else if (reaction.emoji.name == "🔉") {
            try {
              reaction.users.remove(user.id)
              if (queue) {
                let vol = queue.volume;
                player.setVolume(interaction, Number(vol) - 10)
              }
            } catch {
              console.log('')
            }
          } else if (reaction.emoji.name == "🔊") {
            try {
              reaction.users.remove(user.id)
              if (queue) {
                let vol = queue.volume;
                player.setVolume(interaction, Number(vol) + 10)
              }
            } catch {
              console.log('')
            }
          }
        });
      });
    });
  },
}; 
