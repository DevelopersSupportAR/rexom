const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');
const discordTTS = require('discord-tts');

module.exports = {
    name: "say",
    description: "Make The Bot Say Any Thing",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "the word that the bot will say",
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
        if (lang == "en") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            interaction.followUp({ content: emojis.error + " | هذا الأمر م يعمل على هذا الأصدار من البوت" });
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            interaction.followUp({ content: emojis.error + " | this command is will not run in this version" });
        }
    },
};