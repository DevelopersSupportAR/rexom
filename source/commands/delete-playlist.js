const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const colors = require('../../config/colors.json');
const db = require('quick.db');
const embed = require('../structures/embeds');
module.exports = {
    name: "delete-playlist",
    aliases: [],
    description: "delete an playlists",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let z = 0;
            let value = message.content.split(' ').slice(1).join(' ');
            if (!value) return embed.warn(message, "Please input the playlist name to continue");
            let data = db.fetch(`PlaylistsData_${message.author.id}`);
            if (data == null) return await db.set(`PlaylistsData_${message.author.id}`, []) && embed.warn(message, `**thare are no user cold \`${message.author.username}\`!.**`);
            let araay = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.name == value) { z = 1 } else {
                    araay.push(element)
                }
            }
            await db.set(`PlaylistsData_${message.author.id}`, araay)
            setTimeout(async() => {
                if (z == 1) {
                    await embed.done(message, "Playlist has removed");
                } else if (z == 0) {
                    await embed.warn(message, "I Can't Find This Playlist");
                }
            }, 1440);
        } catch {
            console.log('rexom')
        }
    }
};