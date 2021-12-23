const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');
const embed = require("../structures/embeds");

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
        try {
            let settings = db.fetch(`Settings_${interaction.guild.id}`);
            let lang = settings.lang;
            if (lang == "ar") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                connection;
                db.set(`Voice_Channel_${interaction.guild.id}`, voiceChannel.id);
                embed.done(interaction, `**تم التثبيت في <#${voiceChannel.id}>**`, "/");
            } else if (lang == "en") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                let channel = client.channels.cache.find(c => c.id == voiceChannel.id);
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                connection;
                db.set(`Voice_Channel_${interaction.guild.id}`, voiceChannel.id);
                embed.done(interaction, `**Done Joined <#${voiceChannel.id}>**`, "/");
            }
        } catch {
            console.log('rexom')
        }
    },
};