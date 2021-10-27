const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "filter",
    description: "songs filters",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "The Filter Name",
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
            let settings = db.fetch(`Settings_${interaction.guild.id}`);
            let lang = settings.lang;
            if (lang == "ar") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) embed.notInVoice(interaction, lang, "/")
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/")
                if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(interaction.options.getString("value"))) {
                    player.setFilter(interaction, args[0]);
                    embed.done(interaction, `**تم تغير فلتر الصوت الخاص بطابور العرض الى \`${value}\`**`, "/");
                } else return embed.warn(interaction, `لا يمكنني العثور على هذا الأسم يمكنك الأختيار من هذه القائمه: **['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']**`, "/");
            } else if (lang == "en") {
                const voiceChannel = interaction.member.voice.channel;
                if (!voiceChannel) embed.notInVoice(interaction, lang, "/")
                const queue = player.getQueue(interaction);
                if (!queue) return embed.notQueue(interaction, lang, "/")
                if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(interaction.options.getString("value"))) {
                    player.setFilter(interaction, args[0]);
                    embed.done(interaction, `**queue filter has been changed to \`${value}\`**`, "/");
                } else return embed.warn(interaction, `i can't find this filter name in my list, choose from thare: **['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']**`, "/");
            }
        } catch {
            console.log('rexom')
        }
    },
};