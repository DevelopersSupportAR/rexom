const { Client, MessageEmbed, ContextMenuInteraction } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "add-to-queue",
    type: "MESSAGE",

    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        let msg;
        const message = await interaction.channel.messages.fetch(interaction.targetId);
        const queue = player.getQueue(interaction);
        if (lang == "ar") {
            msg = "لم يتم تشغيل اي موسيقى اصلا";
        }
        if (lang == "en") {
            msg = "thare is no music playing";
        }
        if (queue) {
            player.play(interaction, message.content);
            if (lang == "ar") {
                interaction.followUp({
                    content: emojis.done + " | تمت أضافة **" + message.content + "** الي طابور عرض السيرفر",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else if (lang == "en") {
                interaction.followUp({
                    content: emojis.done + " | **" + message.content + "** Has Add To Server Queue!.",
                    ephemeral: true,
                    allowedMentions: false
                });
            }
        } else interaction.followUp({ content: emojis.error + ` | **${msg}**`, ephemeral: true })
    },
};