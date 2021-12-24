const { Client, Message, Guild, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require('../../config/emojis.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Give's You The Commands List",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */
    run: async(client, message, args, prefix, lang) => {
        try {
            const embed = new MessageEmbed()
                .setTitle(`Help Commands`)
                .setColor(0x2f3136)
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`**[reXom](https://github.com/DevelopersSupportAR/rexom.git)**, Play your favorite playlist with ReXom 🎶\n
            Version: \`2.8.2\`
            Prefix: ${prefix}\n
            `)
            require('fs').readdir(__dirname + '/', (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    let props = require(__dirname + '/' + file);
                    embed.addFields({ name: prefix + props.name, value: props.description || "o", inline: true })
                });
            });
            message.reply({ content: emojis.loading + " | processing command...", allowedMentions: {
            repliedUser: false
        }, ephemeral: true }).then(msg => {
                setTimeout(() => { msg.edit({ content: emojis.done + " | processing complete!.", embeds: [embed], allowedMentions: {
            repliedUser: false
        }, ephemeral: true }) }, ms('1s'))
            });
        } catch {
            console.log('rexom')
        }
    }
};