const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const colors = require('../../config/colors.json');
const db = require('quick.db');
module.exports = {
    name: "list-playlist",
    aliases: [],
    description: "preview all your playlists",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let data = db.fetch(`PlaylistsData_${message.author.id}`);
            if (data == null) return await db.set(`PlaylistsData_${message.author.id}`, []) && require('../structures/embeds').warn(message, `**thare are no user cold \`${message.author.username}\`!.**`);
            let embed = new MessageEmbed()
                .setAuthor(message.author.username + " Playlists", message.author.avatarURL({ dynamic: true }))
                .setColor(colors.loading);
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.name == "") continue;
                embed.addFields({
                    name: element.name + "_ _",
                    value: element.songs.map((v, i, a) => `[**${i} - ${v}**](${v})`).join('\n')
                });
            }
            message.channel.send({ embeds: [embed] })
        } catch {
            console.log('rexom')
        }
    }
};