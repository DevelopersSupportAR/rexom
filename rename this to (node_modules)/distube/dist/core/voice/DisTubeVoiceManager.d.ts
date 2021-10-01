import { DisTubeVoice } from ".";
import { BaseManager } from "../manager";
import type { GuildIDResolvable } from "../..";
import type { StageChannel, VoiceChannel } from "discord.js";
/**
 * Manages voice connections for {@link DisTube}
 */
export declare class DisTubeVoiceManager extends BaseManager<DisTubeVoice> {
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
    create(channel: VoiceChannel | StageChannel): DisTubeVoice;
    /**
     * Join a voice channel
     * @param {Discord.VoiceChannel|Discord.StageChannel} channel A voice channel to join
     * @returns {Promise<DisTubeVoice>}
     */
    join(channel: VoiceChannel | StageChannel): Promise<DisTubeVoice>;
    /**
     * Leave the connected voice channel in a guild
     * @param {GuildIDResolvable} guild Queue Resolvable
     */
    leave(guild: GuildIDResolvable): void;
}
export default DisTubeVoiceManager;
//# sourceMappingURL=DisTubeVoiceManager.d.ts.map