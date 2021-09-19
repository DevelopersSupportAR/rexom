const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "play",
    description: "Play a music/playlist",
    type: 'CHAT_INPUT',
    options: [{
        name: "song",
        description: "The Song/Playlist Name/Url",
        type: "STRING",
        required: true
    }],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        module.exports.guildLANG = lang;
        module.exports.interactionGET = interaction;
        if (lang == "en") {
            module.exports.guildID = interaction.guild.id;
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.play(interaction, interaction.options.getString("song"));
            interaction.followUp({ content: `**🔍 | Searching To:** \`${interaction.options.getString("song")}\``, allowedMentions: false, ephemeral: true })
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.play(interaction, interaction.options.getString("song"));
            interaction.followUp({ content: `**🔍 | جار البحث عن:** \`${interaction.options.getString("song")}\``, allowedMentions: false, ephemeral: true })
        }
    },
};