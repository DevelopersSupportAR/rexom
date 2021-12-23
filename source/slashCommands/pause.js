const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "pause",
    description: "Pause The Music",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        try {
            let settings = db.fetch(`Settings_${interaction.guild.id}`);
            let lang = settings.lang;
            if (lang == "en") {
                module.exports.guildID = interaction.guild.id;
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/");
                if (queue.paused == true) return embed.warn(interaction, "**this Music Is All Ready Paused**", "/")
                player.pause(interaction);
                embed.done("**Music Has Paused*", "/");
            } else if (lang == "ar") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/");
                if (queue.paused == true) return embed.warn(interaction, "**الميوزك واقف يا بيض ’_’**", "/")
                player.pause(interaction)
                embed.done("**تم أيقاف الموسقى*", "/");
            }
        } catch {
            console.log('rexom')
        }
    },
};