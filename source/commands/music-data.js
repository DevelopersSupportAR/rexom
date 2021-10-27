const { Client, Message, MessageEmbed } = require("discord.js");
const colors = require('../../config/colors.json');
const player = require("../client/player");
const embed = require('../structures/embeds');

module.exports = {
    name: "music-data",
    aliases: [],
    description: "get all the playing music data",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let queue = player.getQueue(message);
            if (!queue) return embed.notQueue(message, lang)
            let value = queue.songs.map((v, i, a) => v).slice(0, 1)[0];
            if (!value) return embed.err(message, "this song number is not exiest")
            message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(colors.done)
                    .setDescription(`\`\`\`\n${value.name}\n\`\`\``)
                    .addField("Liks 👍", `${value.likes}` || "null", true)
                    .addField("Diliks 👎", `${value.dislikes}` || "null", true)
                    .addField("Duration 🕙", `${value.formattedDuration}` || "null", true)
                    .addField("isLive 📹", `${value.isLive}` || "false", true)
                    .addField("Requester 👥", `${value.user.tag}` || "null", true)
                    .addField("Song repost count ➿", `${value.reposts}` || "0", true)
                    .addField("Song source 👑", `${value.source}` || "null", true)
                    .addField("stramURL 🥌", `[Here](${value.streamURL ? value.streamURL : value.url})`, true)
                    .addField("URL ➰", `[Here](${value.url})`, true)
                    .addField("Views 👀", `${value.views}`, true)
                    .addField("Uploader 🧗", `[${value.uploader.name}](${value.uploader.url})`, true)
                    .addField("Related songs 🎶", value.related.map((v, i, a) => `[${v.name}](${v.url})` || "null").slice(0, 5).join("\n-") || "null", true)
                    .setImage(value.thumbnail || client.user.avatarURL({ dynamic: true }))
                ],
                allowedMentions: {
                    repliedUser: false
                }
            });
        } catch {
            console.log('rexom')
        }
    }
};