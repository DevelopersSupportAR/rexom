const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

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
            if (!value) return message.reply({
                content: emojis.error + ` | Wrong Use: /save-playlist songs: song1, song2`,
                ephemeral: true,
                allowedMentions: false
            });
            let data = value;
            let checker = db.get(`SDPL_${message.user.id}.data`);
            if (checker == null) return db.set(`SDPL_${message.user.id}`, { data: ['no'] }) && message.reply({ content: emojis.warn + " | Your New Profile Has Setuped Please use the command again!.", ephemeral: false, components: [] });
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
                let filter = i => i.user.id == message.user.id;
                let msg = await message.reply({ content: emojis.warn + " | you have a saved playlist on your profile,\n you can't add more playlist but you can delete the last playlist!", ephemeral: false, components: [row] });
                let collector = await msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on("collect", async(i) => {
                    if (i.customId == "a") {
                        db.delete(`SDPL_${message.user.id}`)
                        return message.edit({ content: emojis.done + " | Your Old Playlist Has Removed", ephemeral: true, components: [] })
                    } else if (i.customId == "c") {
                        return message.edit({ content: emojis.done + " | Your Old Playlist Is Still Working", ephemeral: true, components: [] })
                    }
                });
                return;
            }
            if (!data.includes(',')) return message.reply({ content: emojis.error + " | Wrong Use: /save-playlist songs: song1, song2", ephemeral: true });
            let array = []
            for (let num = 0; num < 10; num++) {
                const element = data.split(',')[num];
                if (element == undefined) continue;
                console.log(element)
                array.push(element)
            }
            db.set(`SDPL_${message.user.id}.data`, array);
            message.reply({ content: emojis.done + " | You Have Saved A Playlist on **reXom** Check The Songs That You Add! ==> " + array, ephemeral: true, components: [] })
        } else if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | أستخدام خاطأ: /save-playlist songs: song1, song2`,
                ephemeral: true,
                allowedMentions: false
            });
            let data = value;
            let checker = db.get(`SDPL_${message.user.id}.data`);
            if (checker == null) return db.set(`SDPL_${message.user.id}`, { data: ['no'] }) && message.reply({ content: emojis.warn + " | تم تجهيز حسابك للعمل على حفظ البيانات!.", ephemeral: false, components: [] });
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
                let filter = i => i.user.id == message.user.id;
                let msg = await message.reply({ content: emojis.warn + " | لديك قائمة تشغيل محفوظه بالفعل,\n لا يمكنك أضافة المزيد من قوائم التشغيل بل يمكنك استبدالها!", ephemeral: false, components: [row] });
                let collector = await msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on("collect", async(i) => {
                    if (i.customId == "a") {
                        db.delete(`SDPL_${message.user.id}`)
                        return message.edit({ content: emojis.done + " | تم حزف قائمة التشغيل في حسابك", ephemeral: true, components: [] })
                    } else if (i.customId == "c") {
                        return message.edit({ content: emojis.done + " | لم يتم حزف قائمة التشغيل الخاصه بحسابك", ephemeral: true, components: [] })
                    }
                });
                return;
            }
            if (!data.includes(',')) return message.reply({ content: emojis.error + " | أستخدام خاطئ: /save-playlist songs: song1, song2", ephemeral: true });
            let array = []
            for (let num = 0; num < 10; num++) {
                const element = data.split(',')[num];
                if (element == undefined) continue;
                console.log(element)
                array.push(element)
            }
            db.set(`SDPL_${message.user.id}.data`, array);
            message.reply({ content: emojis.done + " | لقد قمت بحفظ قائمة تشغيل جديده في **reXom** تحقق من الأغناي! ==> " + array, ephemeral: true, components: [] })
        }
    }
};