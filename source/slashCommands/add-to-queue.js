const { Client, MessageEmbed, ContextMenuInteraction } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

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
        try {
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
                    embed.done(interaction, "تمت أضافة **" + message.content + "** الي طابور عرض السيرفر", "/")
                } else if (lang == "en") {
                    embed.done(interaction, "**" + message.content + "** Has Add To Server Queue!.", "/");
                }
            } else embed.notQueue(interaction, lang, "/")
        } catch {
            console.log('rexom')
        }
    },
};