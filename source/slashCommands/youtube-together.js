const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
const fetch = require("node-fetch");
const emojis = require("../../config/emojis.json");
const db = require("quick.db");
const embeds = require("../structures/embeds");

module.exports = {
  name: "youtube-together",
  description: "Watch Youtube in discord",
  type: "CHAT_INPUT",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    let settings = db.fetch(`Settings_${interaction.guild.id}`);
    let lang = settings.lang;
    let channel = interaction.member.voice.channel;
    if (!channel) return embeds.notInVoice(interaction, lang, "/");
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
        embeds.done(
          interaction,
          `**[YouTube Together](https://discord.com/invite/${invite.code})**`,
          "/"
        );
      });
  },
};
