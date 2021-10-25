const { MessageEmbed, Collection, Client, Message, MessageButton, MessageActionRow } = require('discord.js');
const { commands, player } = require('../index');
const db = require('quick.db');
const cooldowns = new Map();
const colors = require('../../config/colors.json');

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = async(client, message) => {
    module.exports.messageGET = message;
    if (message.channel.type == "DM") return;
    let data = db.fetch(`SeTupInFo_${message.guild.id}`);
    if (data !== null) {
        if (message.channel.id == data.channelID) {
            message.delete()
            if (message.guild.me.voice.channel) {
                if (message.member.voice.channel !== message.guild.me.voice.channel) return message.reply({ content: emojis.error + ' | please join a voice channel first!' })
            }
            player.play(message, message.content).then(() => {
                setInterval(() => {
                    message.channel.messages.fetch(data.msgID).then(msg => {
                        let queue = player.getQueue(message);
                        msg.edit({
                            embeds: [
                                new MessageEmbed()
                                .setAuthor(require('../music/playSong').song.name || "No song playing currently")
                                .setColor(colors.done)
                                .setImage(require('../music/playSong').song.thumbnail || "https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                                .setFooter(`${queue ? queue.songs.length : 0} in load | ${require('../music/playSong').song.likes}👍 ${require('../music/playSong').song.dislikes}👎`, client.user.avatarURL({ dynamic: true }))
                            ],
                        });
                    });
                }, 5000);
            });
        }
    }
    if (message.author.bot) return;
    let settings = db.fetch(`Settings_${message.guild.id}`);
    if (settings == null) return db.set(`Settings_${message.guild.id}`, {
        prefix: require('../../config/bot.json').mainPrefix,
        lang: require('../../config/bot.json').mainLang
    });
    let prefix = settings.prefix;
    let lang = settings.lang;
    if (!message.content.startsWith(prefix)) return;
    if (!message.content.includes(prefix)) return;
    const argument = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = argument.shift().toLowerCase()
    const command = commands.get(cmd) || commands.find(a => a.aliases && a.aliases.includes(cmd));
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