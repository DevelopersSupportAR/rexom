const { Client, CommandInteraction, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "delete-playlist",
    description: "delete an playlists",
    type: 'CHAT_INPUT',
    options: [{
        name: "name",
        description: "the name of the playlist",
        type: "STRING",
        required: true
    }],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        try {
            let z = 0;
            let value = interaction.options.getString('name');
            let data = db.fetch(`PlaylistsData_${interaction.user.id}`);
            if (data == null) return await db.set(`PlaylistsData_${interaction.user.id}`, []) && embed.warn(interaction, `**thare are no user cold \`${interaction.user.username}\`!.**`, "/");
            let araay = [];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (element.name == value) { z = 1 } else {
                    araay.push(element)
                }
            }
            await db.set(`PlaylistsData_${interaction.user.id}`, araay)
            setTimeout(async() => {
                if (z == 1) {
                    await embed.done(interaction, "Playlist has removed", "/");
                } else if (z == 0) {
                    await embed.warn(interaction, "I Can't Find This Playlist", "/");
                }
            }, 1440);
        } catch {
            console.log('rexom')
        }
    },
};