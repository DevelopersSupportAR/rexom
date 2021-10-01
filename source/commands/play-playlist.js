const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "play-playlist",
    aliases: [],
    description: "play your playlist",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        if (lang == "en") {
            let data = db.get(`SDPL_${message.user.id}.data`);
            if (data == null || data.includes('no')) return message.reply({ content: emojis.error + " | i cna't find any playlist in you account profile" });

            setTimeout(() => {
                if (data[0] !== undefined) player.play(message, data[0]);
            }, 1000);
            setTimeout(() => {
                if (data[1] !== undefined) player.play(message, data[1]);
            }, 2000);
            setTimeout(() => {
                if (data[2] !== undefined) player.play(message, data[2]);
            }, 3000);
            setTimeout(() => {
                if (data[3] !== undefined) player.play(message, data[3]);
            }, 4000);
            setTimeout(() => {
                if (data[4] !== undefined) player.play(message, data[4]);
            }, 5000);
            setTimeout(() => {
                if (data[5] !== undefined) player.play(message, data[5]);
            }, 6000);
            setTimeout(() => {
                if (data[6] !== undefined) player.play(message, data[6]);
            }, 7000);
            setTimeout(() => {
                if (data[7] !== undefined) player.play(message, data[7]);
            }, 8000);
            setTimeout(() => {
                if (data[8] !== undefined) player.play(message, data[8]);
            }, 9000);
            setTimeout(() => {
                if (data[9] !== undefined) player.play(message, data[9]);
            }, 10000);

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element == undefined) continue;
                console.log(element)
                player.play(message, element)
            }

            message.reply({ content: emojis.done + " | You Play List Is Playing!" })
        } else if (lang == "ar") {
            let data = db.get(`SDPL_${message.user.id}.data`);
            if (data == null || data.includes('no')) return message.reply({ content: emojis.error + " | ليس لديك اي قوائم تشغيل في حسابك" });

            setTimeout(() => {
                if (data[0] !== undefined) player.play(message, data[0]);
            }, 1000);
            setTimeout(() => {
                if (data[1] !== undefined) player.play(message, data[1]);
            }, 2000);
            setTimeout(() => {
                if (data[2] !== undefined) player.play(message, data[2]);
            }, 3000);
            setTimeout(() => {
                if (data[3] !== undefined) player.play(message, data[3]);
            }, 4000);
            setTimeout(() => {
                if (data[4] !== undefined) player.play(message, data[4]);
            }, 5000);
            setTimeout(() => {
                if (data[5] !== undefined) player.play(message, data[5]);
            }, 6000);
            setTimeout(() => {
                if (data[6] !== undefined) player.play(message, data[6]);
            }, 7000);
            setTimeout(() => {
                if (data[7] !== undefined) player.play(message, data[7]);
            }, 8000);
            setTimeout(() => {
                if (data[8] !== undefined) player.play(message, data[8]);
            }, 9000);
            setTimeout(() => {
                if (data[9] !== undefined) player.play(message, data[9]);
            }, 10000);

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element == undefined) continue;
                console.log(element)
                player.play(message, element)
            }

            message.reply({ content: emojis.done + " | قائمة التشيل خاصتك تعمل!" })
        }
    }
};