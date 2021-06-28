module.exports = {
    name: "ping",
    cooldown: 3,
    description: 'view the bot ping',
    aliases: ["ping"],
    run: async function(client, message, args, user) {
        var states = "🟢 Excellent";
        var states2 = "🟢 Excellent";
        var msg = `${Date.now() - message.createdTimestamp}`;
        var api = `${Math.round(client.ws.ping)}`;
        if (Number(msg) > 70) states = "🟢 Good";
        if (Number(msg) > 170) states = "🟡 Not Bad";
        if (Number(msg) > 350) states = "🔴 Soo Bad";
        if (Number(api) > 70) states2 = "🟢 Good";
        if (Number(api) > 170) states2 = "🟡 Not Bad";
        if (Number(api) > 350) states2 = "🔴 Soo Bad";
        if (message.author.bot) return;
        message.channel.send({
            embed: {
                description: `**Time Taken:** ${msg} ms 📶 | ${states}\n**WebSocket:** ${api} ms 📶 | ${states2}`,
                color: 0x2F3136
            }
        });
    }
};