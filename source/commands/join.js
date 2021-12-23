const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');
const embed = require('../structures/embeds');

module.exports = {
    name: "join",
    aliases: ["set-join"],
    description: "24/7 in the channel",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                connection;
                db.set(`Voice_Channel_${message.guild.id}`, voiceChannel.id);
                embed.done(message, `**تم التثبيت في <#${voiceChannel.id}>**`)
            } else if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                connection;
                db.set(`Voice_Channel_${message.guild.id}`, voiceChannel.id);
                embed.done(message, `**Done Joined <#${voiceChannel.id}>**`)
            }
        } catch {
            console.log('rexom')
        }
    }
};