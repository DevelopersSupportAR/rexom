const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

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
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            db.delete(`Voice_Channel_${interaction.guild.id}`);
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | تمت ازالة التثبيت من: <#${voiceChannel.id}>`)
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
            db.delete(`Voice_Channel_${interaction.guild.id}`);
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`🗃️ | Done Leaved <#${voiceChannel.id}>`)
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};