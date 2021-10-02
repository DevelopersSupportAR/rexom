const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "jump",
    description: "skip a specific song",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "The Song Number On The Queue",
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
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            try {
                player.jump(interaction, parseInt(interaction.options.getNumber('value')))
            } catch (err) {
                interaction.followUp({
                    content: "لا يمكن العثور على رقم الأغنيه في طابور عرض الموسيقى",
                    ephemeral: true,
                    allowedMentions: false
                })
                throw err;
            }
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setAuthor(`⤵ | Jump`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                    .setColor('GREEN')
                    .setDescription(`⤵ | تم القفظ الى الأغنيه صاحبة الرقم: \`${parseInt(interaction.options.getNumber('value'))}\``)
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
            try {
                player.jump(interaction, parseInt(interaction.options.getNumber('value')))
            } catch (err) {
                interaction.followUp({
                    content: "the bot can't find this song number on the server queue",
                    ephemeral: true,
                    allowedMentions: false
                })
                throw err;
            }
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setAuthor(`⤵ | Jump`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                    .setColor('GREEN')
                    .setDescription(`⤵ | done jumped to song number \`${parseInt(interaction.options.getNumber('value'))}\``)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};