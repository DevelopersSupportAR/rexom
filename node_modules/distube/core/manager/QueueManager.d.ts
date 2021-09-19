import { BaseManager } from ".";
import { Queue } from "../..";
import type { Song } from "../..";
import type { StageChannel, TextChannel, VoiceChannel } from "discord.js";
/**
 * Queue manager
 */
export declare class QueueManager extends BaseManager<Queue> {
    /**
     * Create a {@link Queue}
     * @private
     * @param {Discord.VoiceChannel|Discord.StageChannel} channel A voice channel
     * @param {Song|Song[]} song First song
     * @param {Discord.TextChannel} textChannel Default text channel
     * @returns {Promise<Queue|true>} Returns `true` if encounter an error
     */
    create(channel: VoiceChannel | StageChannel, song: Song[] | Song, textChannel?: TextChannel): Promise<Queue | true>;
    /**
     * Get a Queue from this QueueManager.
     * @method get
     * @memberof QueueManager#
     * @param {GuildIDResolvable} queue Resolvable thing from a guild
     * @returns {Queue?}
     */
    /**
     * Listen to DisTubeVoice events and handle the Queue
     * @private
     * @param {Queue} queue Queue
     */
    private _voiceEventHandler;
    /**
     * Handle the queue when a Song finish
     * @private
     * @param {Queue} queue queue
     * @returns {Promise<void>}
     */
    private _handleSongFinish;
    /**
     * Handle error while playing
     * @private
     * @param {Queue} queue queue
     * @param {Error} error error
     */
    private _handlePlayingError;
    /**
     * Play a song on voice connection
     * @private
     * @param {Queue} queue The guild queue
     * @returns {Promise<boolean>} error?
     */
    playSong(queue: Queue): Promise<boolean>;
    /**
     * Whether or not emit playSong event
     * @param {Queue} queue Queue
     * @private
     * @returns {boolean}
     */
    private _emitPlaySong;
}
//# sourceMappingURL=QueueManager.d.ts.map