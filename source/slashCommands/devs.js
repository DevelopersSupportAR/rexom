const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "devs",
    description: "Bot Devs",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        try {
            let embed = new MessageEmbed()
                .setAuthor('reXom!.', client.user.avatarURL({ dynamic: true }), 'https://discord.gg/developer-support')
                .setColor('DARK_GOLD')
                .addFields({
                    name: "Developers name",
                    value: "ニロ, ᴹᵃᴿˢ#3121",
                    inline: true
                }, {
                    name: "bot github page",
                    value: '[Here](https://github.com/DevelopersSupportAR/rexom.git)',
                    inline: true
                }, {
                    name: "bot support server",
                    value: "[Here](https://discord.gg/developer-support)",
                    inline: true
                })
                .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067");
            interaction.followUp({ embeds: [embed], allowedMentions: {
            repliedUser: false
        }, ephemeral: false });
        } catch {
            console.log('rexom')
        }
    },
};