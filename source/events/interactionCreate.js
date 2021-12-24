const { Client, CommandInteraction } = require("discord.js");
const { slashCommandsMap } = require("../models/slashCommands/loader");
const db = require("quick.db");
const emojis = require("../../config/emojis.json");

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {String[]} args
 */

module.exports = async (client, interaction) => {
  try {
    let slashCommands = slashCommandsMap;
    let settings = db.fetch(`Settings_${interaction.guild.id}`);
    if (settings == null)
      return db.set(`Settings_${interaction.guild.id}`, {
        prefix: require("../../config/bot.json").mainPrefix,
        lang: require("../../config/bot.json").mainLang,
      });
    if (db.fetch(`DJ_TOG_${interaction.guild.id}`) == "on") {
      if (
        !interaction.member.roles.cache.find(
          (role) => role.id == db.fetch(`DJ_${interaction.guild.id}`)
        )
      )
        return interaction.reply({
          ephemeral: true,
          content:
            emojis.error + " | You can't use bot commands with out DJ role",
        });
    }
    if (interaction.isCommand) {
      const cmd = slashCommands.get(interaction.commandName);
      if (!cmd) return;
      await interaction.deferReply().catch(() => {});
      const args = [];
      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name);
          option.options.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }

      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      );
      cmd.run(client, interaction, args);
    }
    if (interaction.isContextMenu()) {
      await interaction.deferReply().catch(() => {});
      const command = slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
    }
  } catch (err) {
    console.log(err);
  }
};
