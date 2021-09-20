const { Client, CommandInteraction, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "play-playlist",
    description: "play your playlist",
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
        if (lang == "en") {
            let data = db.get(`SDPL_${interaction.user.id}.data`);
            if (data == null || data.includes('no')) return interaction.followUp({ content: emojis.error + " | i cna't find any playlist in you account profile" });

            setTimeout(() => {
                if (data[0] !== undefined) player.play(interaction, data[0]);
            }, 1000);
            setTimeout(() => {
                if (data[1] !== undefined) player.play(interaction, data[1]);
            }, 2000);
            setTimeout(() => {
                if (data[2] !== undefined) player.play(interaction, data[2]);
            }, 3000);
            setTimeout(() => {
                if (data[3] !== undefined) player.play(interaction, data[3]);
            }, 4000);
            setTimeout(() => {
                if (data[4] !== undefined) player.play(interaction, data[4]);
            }, 5000);
            setTimeout(() => {
                if (data[5] !== undefined) player.play(interaction, data[5]);
            }, 6000);
            setTimeout(() => {
                if (data[6] !== undefined) player.play(interaction, data[6]);
            }, 7000);
            setTimeout(() => {
                if (data[7] !== undefined) player.play(interaction, data[7]);
            }, 8000);
            setTimeout(() => {
                if (data[8] !== undefined) player.play(interaction, data[8]);
            }, 9000);
            setTimeout(() => {
                if (data[9] !== undefined) player.play(interaction, data[9]);
            }, 10000);

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element == undefined) continue;
                console.log(element)
                player.play(interaction, element)
            }

            interaction.followUp({ content: emojis.done + " | You Play List Is Playing!" })
        } else if (lang == "ar") {
            let data = db.get(`SDPL_${interaction.user.id}.data`);
            if (data == null || data.includes('no')) return interaction.followUp({ content: emojis.error + " | ليس لديك اي قوائم تشغيل في حسابك" });

            setTimeout(() => {
                if (data[0] !== undefined) player.play(interaction, data[0]);
            }, 1000);
            setTimeout(() => {
                if (data[1] !== undefined) player.play(interaction, data[1]);
            }, 2000);
            setTimeout(() => {
                if (data[2] !== undefined) player.play(interaction, data[2]);
            }, 3000);
            setTimeout(() => {
                if (data[3] !== undefined) player.play(interaction, data[3]);
            }, 4000);
            setTimeout(() => {
                if (data[4] !== undefined) player.play(interaction, data[4]);
            }, 5000);
            setTimeout(() => {
                if (data[5] !== undefined) player.play(interaction, data[5]);
            }, 6000);
            setTimeout(() => {
                if (data[6] !== undefined) player.play(interaction, data[6]);
            }, 7000);
            setTimeout(() => {
                if (data[7] !== undefined) player.play(interaction, data[7]);
            }, 8000);
            setTimeout(() => {
                if (data[8] !== undefined) player.play(interaction, data[8]);
            }, 9000);
            setTimeout(() => {
                if (data[9] !== undefined) player.play(interaction, data[9]);
            }, 10000);

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element == undefined) continue;
                console.log(element)
                player.play(interaction, element)
            }

            interaction.followUp({ content: emojis.done + " | قائمة التشيل خاصتك تعمل!" })
        }
    },
};