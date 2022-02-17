const { Client } = require("discord.js");

class RexomPrimeSub {
    /**
     * 
     * @param {Client} client 
     * @param {{guilds: number[]}} data 
     */
    constructor (client, data) {
        client.on("messageCreate", (msg) => {
            if (msg.guild) {
                if (data.guilds.includes(msg.guild?.id)) return true;
                else return false;
            } else return;
        });
        client.on("interactionCreate", (i) => {
            if (i.guild) {
                if (data.guilds.includes(i.guild?.id)) return true;
                else return false;
            } else return true;
        });
    }
}
