const { MessageEmbed, Message, Client } = require("discord.js");
const emojis = require("../../config/emojis.json");
const colors = require("../../config/colors.json");
const { replyType } = require("../../config/bot.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = {
  err: async (message, content, type) => {
    try {
      let embed = new MessageEmbed()
        .setColor(colors.error)
        .setDescription(emojis.error + " | " + content);
      if (type == "/") {
        if (replyType !== "messages")
          message
            .followUp({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .followUp({
              content: `${emojis.error + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.error + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      } else {
        if (replyType !== "messages")
          message
            .reply({
              content: `${emojis.error + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.error + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .reply({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      }
    } catch (err) {
      console.log(err);
    }
  },
  done: async (message, content, type) => {
    try {
      let embed = new MessageEmbed()
        .setColor(colors.done)
        .setDescription(emojis.done + " | " + content);
      if (type == "/") {
        if (replyType !== "messages")
          message
            .followUp({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .followUp({
              content: `${emojis.done + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.done + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      } else {
        if (replyType !== "messages")
          message
            .reply({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .reply({
              content: `${emojis.done + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.done + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      }
    } catch (err) {
      console.log(err);
    }
  },
  loading: async (message, content, type) => {
    try {
      let embed = new MessageEmbed()
        .setColor(colors.loading)
        .setDescription(emojis.loading + " | " + content);

      if (type == "/") {
        if (replyType !== "messages")
          message
            .followUp({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .followUp({
              content: `${emojis.loading + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.loading + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      } else {
        if (replyType !== "messages")
          message
            .reply({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .reply({
              content: `${emojis.loading + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.loading + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      }
    } catch (err) {
      console.log(err);
    }
  },
  warn: async (message, content, type) => {
    try {
      let embed = new MessageEmbed()
        .setColor(colors.warn)
        .setDescription(emojis.warn + " | " + content);
      if (type == "/") {
        if (replyType !== "messages")
          message
            .followUp({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .followUp({
              content: `${emojis.warn + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.warn + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      } else {
        if (replyType !== "messages")
          message
            .reply({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                embeds: [embed],
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
        else
          message
            .reply({
              content: `${emojis.warn + " | " + content}`,
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            })
            .catch(() => {
              message.channel.sned({
                content: `${emojis.warn + " | " + content}`,
                allowedMentions: { repliedUser: false },
                ephemeral: true,
              });
            });
      }
    } catch (err) {
      console.log(err);
    }
  },
  notInVoice: async (message, lang, type) => {
    try {
      let msg;
      if (lang == "en") msg = "**You Have To Be On Voice Channel**";
      if (lang == "ar") msg = "**يجب انت تكون في غرفه صوتيه**";
      let embed = new MessageEmbed()
        .setColor(colors.warn)
        .setDescription(emojis.warn + " | " + msg);
      if (type == "/") {
        message
          .followUp({
            embeds: [embed],
            allowedMentions: { repliedUser: false },
            ephemeral: true,
          })
          .catch(() => {
            message.channel.sned({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            });
          });
      } else {
        message
          .reply({
            embeds: [embed],
            allowedMentions: { repliedUser: false },
            ephemeral: true,
          })
          .catch(() => {
            message.channel.sned({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
  notQueue: async (message, lang, type) => {
    try {
      let msg;
      if (lang == "en") msg = "**Thare are no music in the queue**";
      if (lang == "ar") msg = "**لم يتم تشغيل اي أغنيه اصلا**";
      let embed = new MessageEmbed()
        .setColor(colors.warn)
        .setDescription(emojis.warn + " | " + msg);
      if (type == "/") {
        message
          .followUp({
            embeds: [embed],
            allowedMentions: { repliedUser: false },
            ephemeral: true,
          })
          .catch(() => {
            message.channel.sned({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            });
          });
      } else {
        message
          .reply({
            embeds: [embed],
            allowedMentions: { repliedUser: false },
            ephemeral: true,
          })
          .catch(() => {
            message.channel.sned({
              embeds: [embed],
              allowedMentions: { repliedUser: false },
              ephemeral: true,
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
