import type { Client, TextChannel } from "discord.js";
import type { DisTube, DisTubeEvents, DisTubeHandler, DisTubeVoiceManager, Options, QueueManager } from "..";
/**
 * @private
 * @abstract
 */
export declare abstract class DisTubeBase {
    distube: DisTube;
    constructor(distube: DisTube);
    /**
     * Emit the {@link DisTube} of this base
     * @param {string} eventName Event name
     * @param {...any} args arguments
     * @returns {boolean}
     */
    emit(eventName: keyof DisTubeEvents, ...args: any): boolean;
    /**
     * Emit error event
     * @param {Error} error error
     * @param {Discord.TextChannel?} channel Text channel where the error is encountered.
     */
    emitError(error: Error, channel?: TextChannel): void;
    /**
     * The queue manager
     * @type {QueueManager}
     * @readonly
     */
    get queues(): QueueManager;
    /**
     * The voice manager
     * @type {DisTubeVoiceManager}
     * @readonly
     */
    get voices(): DisTubeVoiceManager;
    /**
     * Discord.js client
     * @type {Discord.Client}
     * @readonly
     */
    get client(): Client;
    /**
     * DisTube options
     * @type {DisTubeOptions}
     * @readonly
     */
    get options(): Options;
    /**
     * DisTube handler
     * @type {DisTubeHandler}
     * @readonly
     */
    get handler(): DisTubeHandler;
}
export default DisTubeBase;
//# sourceMappingURL=DisTubeBase.d.ts.map