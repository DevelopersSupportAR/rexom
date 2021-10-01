"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscordJSAdapter = void 0;
const discord_js_1 = require("discord.js");
const adapters = new Map();
const trackedClients = new Set();
function trackClient(client) {
    if (trackedClients.has(client))
        return;
    trackedClients.add(client);
    client.ws.on(discord_js_1.Constants.WSEvents.VOICE_SERVER_UPDATE, (payload) => {
        var _a;
        (_a = adapters.get(payload.guild_id)) === null || _a === void 0 ? void 0 : _a.onVoiceServerUpdate(payload);
    });
    client.ws.on(discord_js_1.Constants.WSEvents.VOICE_STATE_UPDATE, (payload) => {
        var _a, _b;
        if (payload.guild_id && payload.session_id && payload.user_id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
            (_b = adapters.get(payload.guild_id)) === null || _b === void 0 ? void 0 : _b.onVoiceStateUpdate(payload);
        }
    });
    client.on(discord_js_1.Constants.Events.SHARD_DISCONNECT, (_, shardID) => {
        var _a;
        const guilds = trackedShards.get(shardID);
        if (guilds) {
            for (const guildID of guilds.values()) {
                (_a = adapters.get(guildID)) === null || _a === void 0 ? void 0 : _a.destroy();
            }
        }
        trackedShards.delete(shardID);
    });
}
const trackedShards = new Map();
function trackGuild(guild) {
    let guilds = trackedShards.get(guild.shardID);
    if (!guilds) {
        guilds = new Set();
        trackedShards.set(guild.shardID, guilds);
    }
    guilds.add(guild.id);
}
function createDiscordJSAdapter(channel) {
    return methods => {
        adapters.set(channel.guild.id, methods);
        trackClient(channel.client);
        trackGuild(channel.guild);
        return {
            sendPayload(data) {
                if (channel.guild.shard.status === discord_js_1.Constants.Status.READY) {
                    channel.guild.shard.send(data);
                    return true;
                }
                return false;
            },
            destroy() {
                return adapters.delete(channel.guild.id);
            },
        };
    };
}
exports.createDiscordJSAdapter = createDiscordJSAdapter;
//# sourceMappingURL=DJSAdapter.js.map