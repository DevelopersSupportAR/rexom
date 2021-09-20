const { MessageEmbed, Collection, Client, Message, MessageButton, MessageActionRow } = require('discord.js');
const db = require('quick.db');
const cooldowns = new Map();

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = async(client, message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    let settings = db.fetch(`Settings_${message.guild.id}`);
    if (settings == null) return db.set(`Settings_${message.guild.id}`, {
        prefix: require('../../config/bot.json').mainPrefix,
        lang: require('../../config/bot.json').mainLang
    });
    let prefix = settings.prefix;
    let lang = settings.lang;
    if (!message.content.includes(prefix)) return;
    const argument = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = argument.shift().toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if (!command) return
    if (!cooldowns.has(command.name)) {
        const coll = new Collection()
        cooldowns.set(command.name, coll)
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = 2 * 1000
    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000
            return message.reply({ embeds: [new MessageEmbed().setColor("#FC0000").setDescription(`**🕘 | You Are In Cooldown Please Wait \`${time_left.toFixed(1)}\` To Use \`${prefix}${command.name}\` Again**`)] })
        }
    }
    time_stamps.set(message.author.id, current_time)
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    const args = message.content.split(' ');
    try {
        command.run(client, message, args, prefix, lang);
    } catch (e) {
        message.reply({ content: ':x: | Something went wrong ```' + e + '```' });
    }

};
