const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "dj",
    description: "Set DJ Role",
    type: 'CHAT_INPUT',
    options: [{
        name: "role",
        description: "the dj role",
        type: "ROLE",
        required: true
    }, {
        name: "toggle",
        description: "the dj role roggle ['on', 'off']",
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
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "en") {
            if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
                if (!interaction.options.getString("toggle") == "on" || !interaction.options.getString("toggle") == "off") return interaction.followUp({
                    content: emojis.error + ` | only ['on', 'off'] words is allowed`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`DJ_${interaction.guild.id}`, interaction.options.getRole("role").id);
                db.set(`DJ_TOG_${interaction.guild.id}`, interaction.options.getString("toggle"));
                interaction.followUp({
                    content: emojis.done + " | The \`DJ\` Role Changed In **" + interaction.guild.name + "** to: <@&" + interaction.options.getRole("role").id + "> in `" + interaction.options.getString("toggle") + "` mode",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + ` | You Need To get adminstrator permissions`,
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            if (interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR]) || interaction.member.roles.cache.find(role => role.id == db.fetch(`DJ_${interaction.guild.id}`))) {
                if (!interaction.options.getString("toggle") == "on" || !interaction.options.getString("toggle") == "off") return interaction.followUp({
                    content: emojis.error + ` | فقط الكلمات ['on', 'off'] مسموحه`,
                    ephemeral: true,
                    allowedMentions: false
                });
                db.set(`DJ_${interaction.guild.id}`, interaction.options.getRole("role").id);
                db.set(`DJ_TOG_${interaction.guild.id}`, interaction.options.getString("toggle"));
                interaction.followUp({
                    content: emojis.done + " | تمت تغير رتبت ال \`DJ\` في **" + interaction.guild.name + "** لـ: <@&" + interaction.options.getRole("role").id + "> في وضع `" + interaction.options.getString("toggle") + "` mode",
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + ` | يجب انت تحصل على صلحيات الأدمنستناتور`,
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};