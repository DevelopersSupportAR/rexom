"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
const __1 = require("..");
/** Class representing a search result. */
class SearchResult {
    /**
     * Create a search result
     * @param {Object} info ytsr result
     */
    constructor(info) {
        var _a, _b;
        this.source = "youtube";
        /**
         * Type of SearchResult (`video` or `playlist`)
         * @type {string}
         */
        this.type = info.type;
        /**
         * YouTube video or playlist id
         * @type {string}
         */
        this.id = info.id;
        /**
         * Video or playlist title.
         * @type {string}
         */
        this.name = info.name;
        /**
         * Video or playlist URL.
         * @type {string}
         */
        this.url = info.url;
        if (this.type === "video") {
            info = info;
            /**
             * [Video only] Video or playlist views count
             * @type {number}
             */
            this.views = info.views;
            /**
             * [Video only] Indicates if the video is an active live.
             * @type {boolean?}
             */
            this.isLive = info.isLive;
            /**
             * [Video only] Video duration.
             * @type {number}
             */
            this.duration = this.isLive ? 0 : (0, __1.toSecond)(info.duration);
            /**
             * [Video only] Formatted duration string `hh:mm:ss` or `mm:ss`.
             * @type {string}
             */
            this.formattedDuration = this.isLive ? "Live" : (0, __1.formatDuration)(this.duration);
            /**
             * [Video only] Video thumbnail.
             * @type {string?}
             */
            this.thumbnail = info.thumbnail;
        }
        else if (this.type !== "playlist") {
            throw new __1.DisTubeError("INVALID_TYPE", ["video", "playlist"], this.type, "SearchResult.type");
        }
        /**
         * Song uploader
         * @type {Object}
         * @prop {string?} name Uploader name
         * @prop {string?} url Uploader url
         */
        this.uploader = {
            name: (_a = (info.author || info.owner)) === null || _a === void 0 ? void 0 : _a.name,
            url: (_b = (info.author || info.owner)) === null || _b === void 0 ? void 0 : _b.url,
        };
    }
}
exports.SearchResult = SearchResult;
exports.default = SearchResult;
//# sourceMappingURL=SearchResult.js.map