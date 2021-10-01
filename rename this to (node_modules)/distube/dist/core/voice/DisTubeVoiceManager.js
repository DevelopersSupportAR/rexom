"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisTubeVoiceManager = void 0;
const _1 = require(".");
const __1 = require("../..");
const manager_1 = require("../manager");
const voice_1 = require("@discordjs/voice");
/**
 * Manages voice connections for {@link DisTube}
 */
class DisTubeVoiceManager extends manager_1.BaseManager {
    /**
     * Get a {@link DisTubeVoice}.
     * @method get
     * @memberof DisTubeVoiceManager#
     * @param {GuildIDResolvable} queue The queue resolvable to resolve
     * @returns {DisTubeVoice?}
     */
    /**
     * Collection of {@link DisTubeVoice}.
     * @name DisTubeVoiceManager#collection
     * @type {Discord.Collection<string, DisTubeVoice>}
     */
    /**
     * Create a {@link DisTubeVoice}
     * @param {Discord.VoiceChannel|Discord.StageChannel} channel A voice channel to join
     * @returns {DisTubeVoice}
     * @private
     */
    create(channel) {
        const existing = this.get(channel.guild.id);
        if (existing) {
            return existing;
        }
        return new _1.DisTubeVoice(this, channel);
    }
    /**
     * Join a voice channel
     * @param {Discord.VoiceChannel|Discord.StageChannel} channel A voice channel to join
     * @returns {Promise<DisTubeVoice>}
     */
    join(channel) {
        const existing = this.get(channel.guild.id);
        if (existing)
            return existing.join(channel);
        return this.create(channel).join();
    }
    /**
     * Leave the connected voice channel in a guild
     * @param {GuildIDResolvable} guild Queue Resolvable
     */
    leave(guild) {
        const voice = this.get(guild);
        if (voice) {
            voice.leave();
        }
        else {
            const connection = (0, voice_1.getVoiceConnection)((0, __1.resolveGuildID)(guild));
            if (connection && connection.state.status !== voice_1.VoiceConnectionStatus.Destroyed) {
                connection.destroy();
            }
        }
    }
}
exports.DisTubeVoiceManager = DisTubeVoiceManager;
exports.default = DisTubeVoiceManager;
//# sourceMappingURL=DisTubeVoiceManager.js.map