"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisTubeBase = void 0;
/**
 * @private
 * @abstract
 */
class DisTubeBase {
    constructor(distube) {
        /**
         * DisTube
         * @type {DisTube}
         */
        this.distube = distube;
    }
    /**
     * Emit the {@link DisTube} of this base
     * @param {string} eventName Event name
     * @param {...any} args arguments
     * @returns {boolean}
     */
    emit(eventName, ...args) {
        return this.distube.emit(eventName, ...args);
    }
    /**
     * Emit error event
     * @param {Error} error error
     * @param {Discord.TextChannel?} channel Text channel where the error is encountered.
     */
    emitError(error, channel) {
        this.distube.emitError(error, channel);
    }
    /**
     * The queue manager
     * @type {QueueManager}
     * @readonly
     */
    get queues() {
        return this.distube.queues;
    }
    /**
     * The voice manager
     * @type {DisTubeVoiceManager}
     * @readonly
     */
    get voices() {
        return this.distube.voices;
    }
    /**
     * Discord.js client
     * @type {Discord.Client}
     * @readonly
     */
    get client() {
        return this.distube.client;
    }
    /**
     * DisTube options
     * @type {DisTubeOptions}
     * @readonly
     */
    get options() {
        return this.distube.options;
    }
    /**
     * DisTube handler
     * @type {DisTubeHandler}
     * @readonly
     */
    get handler() {
        return this.distube.handler;
    }
}
exports.DisTubeBase = DisTubeBase;
exports.default = DisTubeBase;
//# sourceMappingURL=DisTubeBase.js.map