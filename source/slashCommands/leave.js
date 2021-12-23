const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "leave",
    description: "leave the 24/7 channel",
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
                db.delete(`Voice_Channel_${interaction.guild.id}`);
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                connection.destroy(true);
                embed.done(interaction, `**تمت ازالة التثبيت من: <#${voiceChannel.id}>**`, "/");
            } else if (lang == "en") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(interaction, lang, "/");
                db.delete(`Voice_Channel_${interaction.guild.id}`);
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                connection.destroy(true);
                embed.done(interaction, `**Done Leaved <#${voiceChannel.id}>**`, "/");
            }
        } catch {
            console.log('rexom')
        }
    },
};