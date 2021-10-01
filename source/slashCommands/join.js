const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "join",
    description: "24/7 in the channel",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection;
            db.set(`Voice_Channel_${interaction.guild.id}`, voiceChannel.id);
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | تم التثبيت في <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            connection;
            db.set(`Voice_Channel_${interaction.guild.id}`, voiceChannel.id);
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | Done Joined <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};