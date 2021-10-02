const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "loop",
    description: "Loop Queue/Song",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "The Loop Mode Type: ['off', 'repeat song', 'repeat queue']",
        type: "STRING",
        required: false
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
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            var mode = interaction.options.getString('value');
            var modeler;
            if (mode == "off") modeler = 0;
            else if (mode == "repeat song") modeler = 1;
            else if (mode == "repeat queue") modeler = 2;
            else return interaction.followUp({
                content: "you have to type the repeating mode type like <off/repeat song/repeat queue>",
                allowedMentions: false,
                ephemeral: true
            });
            player.setRepeatMode(interaction, parseInt(modeler));
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(`🔄 | Repeating`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                    .setColor('GREEN')
                    .setDescription(`🔄 | repeating mode has changed to: ${mode}`)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
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
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            var mode = interaction.options.getString('value') || "repeat song";
            var modeler;
            if (mode == "off") modeler = 0;
            else if (mode == "repeat song") modeler = 1;
            else if (mode == "repeat queue") modeler = 2;
            else return interaction.followUp({
                content: "you have to type the repeating mode type like <off/repeat song/repeat queue>",
                allowedMentions: false,
                ephemeral: true
            });
            player.setRepeatMode(interaction, parseInt(modeler));
            interaction.followUp({
                embeds: [
                    new MessageEmbed()
                    .setAuthor(`🔄 | Repeating`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                    .setColor('GREEN')
                    .setDescription(`🔄 | repeating mode has changed to: ${mode}`)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};