// const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
// const fetch = require("node-fetch");
// const emojis = require('../../config/emojis.json');
// const db = require('quick.db');

// module.exports = {
//     name: "youtube-together",
//     description: "Watch Youtube in discord",
//     type: 'CHAT_INPUT',

//     /**
//      *
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */

//     run: async(client, interaction, args) => {
//         let settings = db.fetch(`Settings_${interaction.guild.id}`);
//         let lang = settings.lang;
//         if (lang == "en") {
//             module.exports.guildID = interaction.guild.id;
//             const voiceChannel = interaction.member.voice.channel;
//             if (!voiceChannel) {
//                 interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
//                 return
//             }
//             fetch(`https://discord.com/api/v8/channels/${voiceChannel.id}/invites`, {
//                     method: "POST",
//                     body: JSON.stringify({
//                         max_age: 86400,
//                         max_uses: 10,
//                         target_application_id: "755600276941176913",
//                         target_type: 2,
//                         temporary: false,
//                         validate: null
//                     }),
//                     headers: {
//                         "Authorization": `Bot ${client.token}`,
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 .then(res => res.json())
//                 .then(invite => {
//                     let embed = new MessageEmbed()
//                         .setAuthor('YouTubeTogether', "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/1200px-YouTube_social_white_squircle_%282017%29.svg.png", "https://youtube.com/")
//                         .setDescription(`[Here](https://discord.com/invite/${invite.code})`)
//                         .setColor("RED")
//                         // let accept = new MessageButton()
//                         //     .setCustomId('accept')
//                         //     .setLabel('Join 📲')
//                         //     .setStyle("SUCCESS")
//                         // let cancel = new MessageButton()
//                         //     .setCustomId('cancel')
//                         //     .setLabel("Cancel 🛑")
//                         //     .setStyle("DANGER")
//                         // let row = new MessageActionRow()
//                         //     .addComponents(accept, cancel)
//                     interaction.followUp({
//                             // components: [row],
//                             embeds: [embed],
//                             allowedMentions: false,
//                             ephemeral: false
//                         })
//                         // .then(async() => {
//                         //     const filter = i => i.user.id == interaction.user.id && i.member.voice.channel.id == interaction.member.voice.channel.id;
//                         //     const collector = await interaction.channel.createMessageComponentCollector(filter, { time: 0 });
//                         //     collector.on("collect", async(i) => {
//                         //         if (i.customId == "cancel") {
//                         //             interaction.editReply({
//                         //                 content: "🛑 | Cancel",
//                         //                 components: [],
//                         //                 embeds: [],
//                         //                 allowedMentions: false,
//                         //                 ephemeral: true
//                         //             });
//                         //         } else if (i.customId == "accept") {
//                         //             interaction.editReply({
//                         //                 content: "📲 | https://discord.gg/" + invite.code,
//                         //                 components: [],
//                         //                 embeds: [new MessageEmbed().setDescription(`[Here](https://discord.com/invite/${invite.code})`)],
//                         //                 allowedMentions: false,
//                         //                 ephemeral: true
//                         //             });
//                         //         }
//                         //     })
//                         // });
//                 });
//         } else if (lang == "ar") {
//             const voiceChannel = interaction.member.voice.channel;
//             if (!voiceChannel) {
//                 interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
//                 return
//             }
//             fetch(`https://discord.com/api/v8/channels/${interaction.channel.id}/invites`, {
//                     method: "POST",
//                     body: JSON.stringify({
//                         max_age: 86400,
//                         max_uses: 10,
//                         target_application_id: "755600276941176913",
//                         target_type: 2,
//                         temporary: false,
//                         validate: null
//                     }),
//                     headers: {
//                         "Authorization": `Bot ${client.token}`,
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 .then(res => res.json())
//                 .then(invite => {
//                     let embed = new MessageEmbed()
//                         .setAuthor('YouTubeTogether', "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/1200px-YouTube_social_white_squircle_%282017%29.svg.png", "https://youtube.com/")
//                         .setDescription(`[Here](https://discord.com/invite/${invite.code})`)
//                         .setColor("RED")
//                         // let accept = new MessageButton()
//                         //     .setCustomId('accept')
//                         //     .setLabel('Join 📲')
//                         //     .setStyle("SUCCESS")
//                         // let cancel = new MessageButton()
//                         //     .setCustomId('cancel')
//                         //     .setLabel("Cancel 🛑")
//                         //     .setStyle("DANGER")
//                         // let row = new MessageActionRow()
//                         //     .addComponents(accept, cancel)
//                     interaction.followUp({
//                             // components: [row],
//                             embeds: [embed],
//                             allowedMentions: false,
//                             ephemeral: false
//                         })
//                         // .then(async() => {
//                         //     const filter = i => i.user.id == interaction.user.id && i.member.voice.channel.id == interaction.member.voice.channel.id;
//                         //     const collector = await interaction.channel.createMessageComponentCollector(filter, { time: 0 });
//                         //     collector.on("collect", async(i) => {
//                         //         if (i.customId == "cancel") {
//                         //             interaction.editReply({
//                         //                 content: "🛑 | Cancel",
//                         //                 components: [],
//                         //                 embeds: [],
//                         //                 allowedMentions: false,
//                         //                 ephemeral: true
//                         //             });
//                         //         } else if (i.customId == "accept") {
//                         //             interaction.editReply({
//                         //                 content: "📲 | https://discord.gg/" + invite.code,
//                         //                 components: [],
//                         //                 embeds: [new MessageEmbed().setDescription(`[Here](https://discord.com/invite/${invite.code})`)],
//                         //                 allowedMentions: false,
//                         //                 ephemeral: true
//                         //             });
//                         //         }
//                         //     })
//                         // });
//                 });
//         }
//     },
// };