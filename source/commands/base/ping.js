const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

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
