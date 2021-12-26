const { Client, Message } = require("discord.js");
const fetch = require("node-fetch");
const embed = require("../structures/embeds");

module.exports = {
  name: "youtube-together",
  aliases: [],
  description: "Watch Youtube Together",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    let channel = message.member.voice.channel;
    if (!channel) return embed.notInVoice(message, lang);
    await fetch(`https://discord.com/api/v9/channels/${channel?.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 86400,
        max_uses: 0,
        target_application_id: `880218394199220334`,
        target_type: 2,
        temporary: false,
        validate: null,
      }),
      headers: {
        Authorization: `Bot ${client.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((invite) => {
        embed.done(
          message,
          `**[YouTube Together](https://discord.com/invite/${invite.code})**`
        );
      });
  },
};
