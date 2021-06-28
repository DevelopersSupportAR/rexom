module.exports = async function(client, message, result) {
    const { MessageEmbed } = require("discord.js");
    let i = 0;
    message.channel.send(
        new MessageEmbed()
        .setAuthor('🤔 | Choose an option from below', client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
        .setColor('YELLOW')
        .setDescription(result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n"))
        .setFooter(`Enter anything else or wait 60 seconds to cancel`)
        .setTimestamp()
    ).then(async function(msg) {
        require('quick.db').set(`Delete_${message.channel.id}`, msg.id)
    })
};