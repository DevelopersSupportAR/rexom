"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const __1 = require("..");
class Options {
    constructor(options) {
        if (typeof options !== "object" || Array.isArray(options)) {
            throw new __1.DisTubeError("INVALID_TYPE", "object", options, "DisTubeOptions");
        }
        const def = { ...__1.defaultOptions };
        // Object.assign(this, defaultOptions, options);
        const opts = Object.assign({}, def, options);
        this.plugins = opts.plugins;
        this.emitNewSongOnly = opts.emitNewSongOnly;
        this.leaveOnEmpty = opts.leaveOnEmpty;
        this.leaveOnFinish = opts.leaveOnFinish;
        this.leaveOnStop = opts.leaveOnStop;
        this.savePreviousSongs = opts.savePreviousSongs;
        this.youtubeDL = opts.youtubeDL;
        this.updateYouTubeDL = opts.updateYouTubeDL;
        this.searchSongs = opts.searchSongs;
        this.youtubeCookie = opts.youtubeCookie;
        this.youtubeIdentityToken = opts.youtubeIdentityToken;
        this.customFilters = opts.customFilters;
        this.ytdlOptions = opts.ytdlOptions;
        this.searchCooldown = opts.searchCooldown;
        this.emptyCooldown = opts.emptyCooldown;
        this.nsfw = opts.nsfw;
        this.emitAddSongWhenCreatingQueue = opts.emitAddSongWhenCreatingQueue;
        this.emitAddListWhenCreatingQueue = opts.emitAddListWhenCreatingQueue;
        (0, __1.checkInvalidKey)(opts, this, "DisTubeOptions");
        this._validateOptions();
    }
    _validateOptions(options = this) {
        if (typeof options.emitNewSongOnly !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.emitNewSongOnly, "DisTubeOptions.emitNewSongOnly");
        }
        if (typeof options.leaveOnEmpty !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.leaveOnEmpty, "DisTubeOptions.leaveOnEmpty");
        }
        if (typeof options.leaveOnFinish !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.leaveOnFinish, "DisTubeOptions.leaveOnFinish");
        }
        if (typeof options.leaveOnStop !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.leaveOnStop, "DisTubeOptions.leaveOnStop");
        }
        if (typeof options.savePreviousSongs !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.savePreviousSongs, "DisTubeOptions.savePreviousSongs");
        }
        if (typeof options.youtubeDL !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.youtubeDL, "DisTubeOptions.youtubeDL");
        }
        if (typeof options.updateYouTubeDL !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.updateYouTubeDL, "DisTubeOptions.updateYouTubeDL");
        }
        if (typeof options.youtubeCookie !== "undefined" && typeof options.youtubeCookie !== "string") {
            throw new __1.DisTubeError("INVALID_TYPE", "string", options.youtubeCookie, "DisTubeOptions.youtubeCookie");
        }
        if (typeof options.youtubeIdentityToken !== "undefined" && typeof options.youtubeIdentityToken !== "string") {
            throw new __1.DisTubeError("INVALID_TYPE", "string", options.youtubeIdentityToken, "DisTubeOptions.youtubeIdentityToken");
        }
        if (typeof options.customFilters !== "object" || Array.isArray(options.customFilters)) {
            throw new __1.DisTubeError("INVALID_TYPE", "object", options.customFilters, "DisTubeOptions.customFilters");
        }
        if (typeof options.ytdlOptions !== "object" || Array.isArray(options.ytdlOptions)) {
            throw new __1.DisTubeError("INVALID_TYPE", "object", options.ytdlOptions, "DisTubeOptions.ytdlOptions");
        }
        if (typeof options.searchCooldown !== "number" || isNaN(options.searchCooldown)) {
            throw new __1.DisTubeError("INVALID_TYPE", "number", options.searchCooldown, "DisTubeOptions.searchCooldown");
        }
        if (typeof options.emptyCooldown !== "number" || isNaN(options.emptyCooldown)) {
            throw new __1.DisTubeError("INVALID_TYPE", "number", options.emptyCooldown, "DisTubeOptions.emptyCooldown");
        }
        if (typeof options.searchSongs !== "number" || isNaN(options.searchSongs)) {
            throw new __1.DisTubeError("INVALID_TYPE", "number", options.searchSongs, "DisTubeOptions.searchSongs");
        }
        if (!Array.isArray(options.plugins)) {
            throw new __1.DisTubeError("INVALID_TYPE", "Array<Plugin>", options.plugins, "DisTubeOptions.plugins");
        }
        if (typeof options.nsfw !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.nsfw, "DisTubeOptions.nsfw");
        }
        if (typeof options.emitAddSongWhenCreatingQueue !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.emitAddSongWhenCreatingQueue, "DisTubeOptions.emitAddSongWhenCreatingQueue");
        }
        if (typeof options.emitAddListWhenCreatingQueue !== "boolean") {
            throw new __1.DisTubeError("INVALID_TYPE", "boolean", options.emitAddListWhenCreatingQueue, "DisTubeOptions.emitAddListWhenCreatingQueue");
        }
    }
}
exports.Options = Options;
exports.default = Options;
//# sourceMappingURL=DisTubeOptions.js.map