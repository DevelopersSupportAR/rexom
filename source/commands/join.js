const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');

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
        if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection;
            db.set(`Voice_Channel_${message.guild.id}`, voiceChannel.id);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | تم التثبيت في <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection;
            db.set(`Voice_Channel_${message.guild.id}`, voiceChannel.id);
            message.reply({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | Done Joined <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};