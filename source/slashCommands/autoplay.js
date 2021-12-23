const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const { player } = require('../index');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "autoplay",
    description: "Set Auto Play Toggle",
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
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/");
                let mode = player.toggleAutoplay(interaction);
                embed.done(interaction, `**Autoplay toggle has changed to: ` + (mode ? "On" : "Off") + "**", "/");
            } else if (lang == "ar") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/");
                let mode = player.toggleAutoplay(interaction);
                embed.done(interaction, ` وضع التشغيل التلقئاء تحول لـ**: ` + (mode ? "On" : "Off") + "**", "/");
            }
        } catch {
            console.log('rexom')
        }
    },
};