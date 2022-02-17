const { Client } = require('discord.js');
const { activity } = require('../../config/bot.json');
const { status } = require('../../config/bot.json');
const { joinVoiceChannel } = require('@discordjs/voice');

/**
 * 
 * @param {Client} client 
 */

async function ReadyFunction(client, red, blue) {
    console.log(blue('Connected in to: ') + red(client.user.username));
    await client.user.setActivity(activity.name, {
        type: activity.type
    });
    await client.user.setStatus(status);

    setInterval(() => {
        try {
            client.guilds.cache.forEach(guild => {
                let channelID = require('quick.db').fetch(`Voice_Channel_${guild.id}`)
                if (channelID !== null) {
                    let channel = client.channels.cache.find(c => c.id == channelID);
                    const connection = joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                    connection;
                    connection.on("error", err => {
                        return
                    });
                }
            });
        } catch {
            console.log('rexom')
        }
    }, 500);
};

module.exports.get = ReadyFunction;