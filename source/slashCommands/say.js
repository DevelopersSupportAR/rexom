const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const discordTTS = require('discord-tts');
const embed = require("../structures/embeds");

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
            if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            connection;
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            const resource = createAudioResource(discordTTS.getVoiceStream("command has an error"));
            player.play(resource);
            connection.subscribe(player);
            embed.err(interaction, "this command is will not run in this version", "/");
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            connection;
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            const resource = createAudioResource(discordTTS.getVoiceStream("command has an error"));
            player.play(resource);
            connection.subscribe(player);
            embed.err(interaction, "this command is will not run in this version", "/");
        }
    },
};