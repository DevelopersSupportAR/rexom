const { Client, Message, Permissions } = require("discord.js");
const embed = require("../structures/embeds");

module.exports = {
    name: "temp",
    description: "Create An Template Voice Channels System",
    aliases: [],

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return embed.err(message, "you don't have the full permissions to use this command");
            message.guild.channels.create("Temp Channels", {
                type: "GUILD_CATEGORY",
                reason: "Temp On!"
            }).then(c => {
                message.guild.channels.create("Click Here", {
                    type: "GUILD_VOICE",
                    reason: "Temp On!",
                    rateLimitPerUser: 1,
                    userLimit: 1,
                }).then(v => {
                    v.setParent(c.id)
                    const TempChannels = require("discord-temp-channels");
                    const tempChannels = new TempChannels(client);

                    tempChannels.registerChannel(v.id, {
                        childCategory: c.id,
                        childAutoDeleteIfEmpty: true,
                        childFormat: (member, count) => `#${count} | ${member.user.username}`
                    });
                })
            });
            embed.done(message, "temp channels system has ben created in **" + message.guild.name + "**");
        } catch {
            console.log('rexom')
        }
    }
};