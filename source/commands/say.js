const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const tts = require('google-tts-api');
const embed = require("../structures/embeds");

module.exports = {
    name: "say",
    aliases: [],
    description: "Make The Bot Say Any Thing",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = args.slice(1).join(' ');
            if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                if (!value) return embed.warn(message, '**please type the word after the command**');
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
                const resource = createAudioResource(tts.getAudioUrl(value, { lang: "en", slow: false, host: "https://translate.google.com" }));
                player.play(resource);
                connection.subscribe(player);
                message.reply({ content: emojis.done, allowedMentions: { repliedUser: false }, ephemeral: false });
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                if (!value) return embed.warn(message, '**يرجى كتابة الكلمه بعد الأمر**');
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
                const resource = createAudioResource(tts.getAudioUrl(value, { lang: "ar", slow: false, host: "https://translate.google.com" }));
                player.play(resource);
                connection.subscribe(player);
                message.reply({ content: emojis.done, allowedMentions: { repliedUser: false }, ephemeral: false });
            }
        } catch {
            console.log('rexom')
        }
    }
};