const { Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Song, Queue } = require('distube');
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

/**
 * 
 * @param {Client} client 
 * @param {Song} song
 * @param {Queue} queue
 */

module.exports = async (client, queue, song) => {
  module.exports.song = song;
  let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
  let interaction = require('../slashCommands/play').interactionGET || require('../commands/play').messageGET;
  if (lang == "en") {
    let embed = new MessageEmbed()
      .setAuthor(song.name, song.thumbnail, song.url)
      .setColor("GREEN")
      .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
      .setThumbnail(song.thumbnail)
      .setDescription(`🎶 | **__[${song.name}](${song.url})__ Is Playing**\n**📽️ | Music Made By: [${song.uploader.name}](${song.uploader.url})**`)
    let btn1 = new MessageButton()
      .setStyle("DANGER")
      .setEmoji("🛑")
      .setCustomId("stop");
    let btn2 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("🔄")
      .setCustomId("loop");
    let btn3 = new MessageButton()
      .setStyle("DANGER")
      .setEmoji("📑")
      .setCustomId("lyrics");
    let btn4 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("⏭")
      .setCustomId("skip");
    let btn5 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("⏸")
      .setCustomId("pause");
    let btn6 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("▶")
      .setCustomId("resume");
    let row = new MessageActionRow()
      .addComponents(btn1, btn2, btn3);
    let row2 = new MessageActionRow()
      .addComponents(btn4, btn5, btn6);
    let msg = await queue.textChannel.send({ content: `**🔍 | Found:** \`${song.name}\`\n**Played By: \`${song.user.username}\`**`, embeds: [embed], components: [row, row2] })
    const filter = i => i.user.id == song.user.id && i.member.voice.channel.id == song.member.voice.channel.id;
    let collector = msg.createMessageComponentCollector(filter, { time: 0 });

    collector.on('collect', async i => {
      // i.deferReply();
      // if (!interaction.member.voice.channel) return i.channel.send({ content: emojis.error + " | **You Have To Be On Voice Channel, **<@!" + i.user.id + ">", allowedMentions: false, ephemeral: true })
      if (i.customId == "stop") {
        if (queue) {
          let msgID = require('quick.db').fetch(`Delete_${interaction.channel.id}`);
          msg.delete();
          interaction.channel.messages.fetch(msgID).then(m => m.delete())
          player.stop(interaction);
          i.channel.send({ content: "🛑 | **Music Has Stoped**", ephemeral: true })
        }
      } else if (i.customId == "loop") {
        if (queue) {
          player.setRepeatMode(interaction, parseInt(1));
          i.channel.send({ content: "🔄 | **Music Is On Loop**", ephemeral: true })
        }
      } else if (i.customId == "lyrics") {
        if (queue) {
          let lyrics = await require('lyrics-finder')(song.name, song.name) || "Not Found!";
          let lyr = new MessageEmbed()
            .setAuthor(`📑 | Lyrics`, song.thumbnail, song.url)
            .setColor('GREEN')
            .setThumbnail(song.thumbnail)
            .setDescription(lyrics)
            .setFooter("Bot Made By: NIRO")
          i.channel.send({ content: "📑 | **Music Lyrics: **", embeds: [lyr], ephemeral: true })
        }
      } else if (i.customId == "skip") {
        if (queue) {
          if (queue.songs.map((song, i) => i).length == 1) return i.channel.send({ content: ":x: | **Thare Are No Song To Skip**", ephemeral: true });
          else {
            player.skip(interaction);
            i.channel.send({ content: "⏭ | **Music Has Skiped**", ephemeral: true });
          }
        }
      } else if (i.customId == "pause") {
        if (queue) {
          if (queue.paused == true) return i.channel.send({ content: ":x: | **This Music Is All Ready Paused**", ephemeral: true });
          player.pause(interaction);
          i.channel.send({ content: "⏸ | **Music Has Paused**", ephemeral: true });
        }
      } else if (i.customId == "resume") {
        if (queue) {
          if (queue.paused == false) return i.channel.send({ content: ":x: | **The Music Is Not Paused**", ephemeral: true });
          player.resume(interaction);
          i.channel.send({ content: "▶ | **Music Has Resumed**", ephemeral: true });
        }
      }
    });
  } else if (lang == "ar") {
    let embed = new MessageEmbed()
      .setAuthor(song.name, song.thumbnail, song.url)
      .setColor("GREEN")
      .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
      .setThumbnail(song.thumbnail)
      .setDescription(`🎶 | تم تشغيل **__[${song.name}](${song.url})__**\n**📽️ | صاحب الأغنيه: [${song.uploader.name}](${song.uploader.url})**`)
    let btn1 = new MessageButton()
      .setStyle("DANGER")
      .setEmoji("🛑")
      .setCustomId("stop");
    let btn2 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("🔄")
      .setCustomId("loop");
    let btn3 = new MessageButton()
      .setStyle("DANGER")
      .setEmoji("📑")
      .setCustomId("lyrics");
    let btn4 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("⏭")
      .setCustomId("skip");
    let btn5 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("⏸")
      .setCustomId("pause");
    let btn6 = new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("▶")
      .setCustomId("resume");
    let row = new MessageActionRow()
      .addComponents(btn1, btn2, btn3);
    let row2 = new MessageActionRow()
      .addComponents(btn4, btn5, btn6);
    let msg = await queue.textChannel.send({ content: `**🔍 | :تم العثور على** \`${song.name}\`\n**تم التشغيل عن طريق: \`${song.user.username}\`**`, embeds: [embed], components: [row, row2] })
    const filter = i => i.user.id == song.user.id && i.member.voice.channel.id == song.member.voice.channel.id;
    let collector = msg.createMessageComponentCollector(filter, { time: 0 });

    collector.on('collect', async i => {
      // i.deferReply();
      // if (!interaction.member.voice.channel) return i.channel.send({ content: emojis.error + " | **You Have To Be On Voice Channel, **<@!" + i.user.id + ">", allowedMentions: false, ephemeral: true })
      if (i.customId == "stop") {
        if (queue) {
          let msgID = require('quick.db').fetch(`Delete_${interaction.channel.id}`);
          msg.delete();
          interaction.channel.messages.fetch(msgID).then(m => m.delete())
          player.stop(interaction);
          i.channel.send({ content: "🛑 | **تم أياف الموسيقى**", ephemeral: true })
        }
      } else if (i.customId == "loop") {
        if (queue) {
          player.setRepeatMode(interaction, parseInt(1));
          i.channel.send({ content: "🔄 | **تم تقعيل وضع التكرار**", ephemeral: true })
        }
      } else if (i.customId == "lyrics") {
        if (queue) {
          let lyrics = await require('lyrics-finder')(song.name, song.name) || "Not Found!";
          let lyr = new MessageEmbed()
            .setAuthor(`📑 | Lyrics`, song.thumbnail, song.url)
            .setColor('GREEN')
            .setThumbnail(song.thumbnail)
            .setDescription(lyrics)
            .setFooter("Bot Made By: NIRO")
          i.channel.send({ content: "📑 | ** كلمات الأغنية: **", embeds: [lyr], ephemeral: true })
        }
      } else if (i.customId == "skip") {
        if (queue) {
          if (queue.songs.map((song, i) => i).length == 1) return i.channel.send({ content: ":x: | **مفيش حاجه اسكب ليه هل ات عبيت**", ephemeral: true });
          else {
            player.skip(interaction);
            i.channel.send({ content: "⏭ | **تم تخطي الغنيه**", ephemeral: true });
          }
        }
      } else if (i.customId == "pause") {
        if (queue) {
          if (queue.paused == true) return i.channel.send({ content: ":x: | **والله الموسيقى وقفه متبقاش بضان و دوس تاني**", ephemeral: true });
          player.pause(interaction);
          i.channel.send({ content: "⏸ | **تم أيقاف الموسقى**", ephemeral: true });
        }
      } else if (i.customId == "resume") {
        if (queue) {
          if (queue.paused == false) return i.channel.send({ content: ":x: | **لم يتم ايقاف الموسيى اصلا انت بتعمل ايه**", ephemeral: true });
          player.resume(interaction);
          i.channel.send({ content: "▶ | **تم أستكمال الموسيقى**", ephemeral: true });
        }
      }
    });
  }
}
