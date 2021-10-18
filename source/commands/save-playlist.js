const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "save-playlist",
    aliases: [],
    description: "save a playlist",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        let value = message.content.split(' ').slice(1).join(' ');
        if (lang == "en") {
            if (!value) return embed.warn(message, "**Wrong Use: /save-playlist song1, song2**")
            let data = value;
            let checker = db.get(`SDPL_${message.author.id}.data`);
            if (checker == null) return db.set(`SDPL_${message.author.id}`, { data: ['no'] }) && embed.done(message, "**Your New Profile Has Setuped Please use the command again!.**")
            else if (!checker.includes('no')) {
                let btn = new MessageButton()
                    .setEmoji(emojis.done)
                    .setCustomId('a')
                    .setStyle("SUCCESS")
                let cancel = new MessageButton()
                    .setEmoji(emojis.error)
                    .setCustomId('c')
                    .setStyle("DANGER")
                let row = new MessageActionRow()
                    .addComponents(btn, cancel);
                let filter = i => i.user.id == message.author.id;
                let msg = await message.reply({ content: emojis.warn + " | **you have a saved playlist on your profile,\n you can't add more playlist but you can delete the last playlist!**", ephemeral: false, components: [row] });
                let collector = await msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on("collect", async(i) => {
                    if (i.customId == "a") {
                        db.delete(`SDPL_${message.author.id}`)
                        return message.edit({ content: emojis.done + " | **Your Old Playlist Has Removed**", ephemeral: true, components: [] })
                    } else if (i.customId == "c") {
                        return message.edit({ content: emojis.done + " | **Your Old Playlist Is Still Working**", ephemeral: true, components: [] })
                    }
                });
                return;
            }
            if (!data.includes(',')) return embed.warn(message, "**Wrong Use: /save-playlist song1, song2**");
            let array = []
            for (let num = 0; num < 10; num++) {
                const element = data.split(',')[num];
                if (element == undefined) continue;
                console.log(element)
                array.push(element)
            }
            db.set(`SDPL_${message.author.id}.data`, array);
            embed.done(message, " | You Have Saved A Playlist on **reXom** Check The Songs That You Add! ==> " + array);
        } else if (lang == "ar") {
            if (!value) return embed.warn(message, "**أستخدام خاطأ: /save-playlist song1, song2**")
            let data = value;
            let checker = db.get(`SDPL_${message.author.id}.data`);
            if (checker == null) return db.set(`SDPL_${message.author.id}`, { data: ['no'] }) && embed.done(message, "**تم تجهيز حسابك للعمل على حفظ البيانات!.**")
            else if (!checker.includes('no')) {
                let btn = new MessageButton()
                    .setEmoji(emojis.done)
                    .setCustomId('a')
                    .setStyle("SUCCESS")
                let cancel = new MessageButton()
                    .setEmoji(emojis.error)
                    .setCustomId('c')
                    .setStyle("DANGER")
                let row = new MessageActionRow()
                    .addComponents(btn, cancel);
                let filter = i => i.user.id == message.author.id;
                let msg = await message.reply({ content: emojis.warn + " | لديك قائمة تشغيل محفوظه بالفعل,\n لا يمكنك أضافة المزيد من قوائم التشغيل بل يمكنك استبدالها!", ephemeral: false, components: [row] });
                let collector = await msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on("collect", async(i) => {
                    if (i.customId == "a") {
                        db.delete(`SDPL_${message.author.id}`)
                        return message.edit({ content: emojis.done + " | تم حزف قائمة التشغيل في حسابك", ephemeral: true, components: [] })
                    } else if (i.customId == "c") {
                        return message.edit({ content: emojis.done + " | لم يتم حزف قائمة التشغيل الخاصه بحسابك", ephemeral: true, components: [] })
                    }
                });
                return;
            }
            if (!data.includes(',')) return embed.warn(message, "**أستخدام خاطئ: /save-playlist songs: song1, song2**")
            let array = []
            for (let num = 0; num < 10; num++) {
                const element = data.split(',')[num];
                if (element == undefined) continue;
                array.push(element)
            }
            db.set(`SDPL_${message.author.id}.data`, array);
            embed.done("لقد قمت بحفظ قائمة تشغيل جديده في **reXom** تحقق من الأغناي! ==> " + array)
        }
    }
};