const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "seek",
    description: "Skips to the specified timestamp in the track",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "the timestamp",
        type: "NUMBER",
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
            player.seek(interaction, Number(interaction.options.getNumber("value")));
            let embed = new MessageEmbed()
                .setAuthor("✂️ | Seek")
                .setDescription(`**seeked to \`${interaction.options.getNumber("value")}\`**`)
                .setFooter(client.user.username)
                .setTimestamp()
            interaction.followUp({ embeds: [embed] });
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.seek(interaction, Number(interaction.options.getNumber("value")));
            let embed = new MessageEmbed()
                .setAuthor("✂️ | Seek")
                .setDescription(`**seeked to \`${interaction.options.getNumber("value")}\`**`)
                .setFooter(client.user.username)
                .setTimestamp()
            interaction.followUp({ embeds: [embed] });
        }
    },
};