module.exports = {
    name: "prefix",
    cooldown: 3,
    description: 'change the prefix in you guild',
    aliases: ["set-prefix"],

    run: async function(client, message, args, user) {
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var newPrefix = args.join(' ');
            if (!newPrefix) {
                require('quick.db').set(`prefix_${message.guild.id}`, require('../../config/bot').prefix);
                message.channel.send({
                    embed: {
                        description: `The bot prefix has rested to **${require('../../config/bot').prefix}**`,
                        color: 0x00D700
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return });
                    }, 1000 * 7);
                });
            } else if (newPrefix) {
                if (newPrefix.length > 7) {
                    message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            title: `**❌ | Error**`,
                            description: `This prefix is to long`
                        }
                    }).then(async function(msg) {
                        setTimeout(() => {
                            msg.delete().catch(err => { return });
                        }, 1000 * 7);
                    });
                    return
                }
                require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                message.channel.send({
                    embed: {
                        description: `The bot prefix has changed to **${newPrefix}**`,
                        color: 0x00D700
                    }
                });
            }
        } catch (err) {
            return;
        }
    }
}