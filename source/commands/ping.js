const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const { player } = require("../index");
const embed = require("../structures/embeds");

module.exports = {
  name: "ping",
  aliases: [],
  description: "get the bot ping",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    try {
      message.reply({
        content: "Ping: " + client.ws.ping + "ms 📶",
      });
    } catch {
      console.log("rexom");
    }
  },
};
