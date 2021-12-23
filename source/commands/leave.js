const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require('../structures/embeds');

module.exports = {
    name: "leave",
    aliases: [],
    description: "leave the 24/7 channel",

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
                db.delete(`Voice_Channel_${message.guild.id}`);
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                connection.destroy(true);
                embed.done(message, `**تمت ازالة التثبيت من: <#${voiceChannel.id}>**`);
            } else if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                db.delete(`Voice_Channel_${message.guild.id}`);
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                connection.destroy(true);
                embed.done(message, `**Done Leaved <#${voiceChannel.id}>**`);
            }
        } catch {
            console.log('rexom')
        }
    }
};