"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const Playlist_1 = __importDefault(require("./Playlist"));
const __1 = require("..");
/**
 * Class representing a song.
 *
 * <info>If {@link Song} is added from a YouTube {@link SearchResult} or {@link Playlist},
 * some info will be missing to save your resources. It will be filled when emitting {@link DisTube#playSong} event.
 *
 * Missing info: {@link Song#likes}, {@link Song#dislikes}, {@link Song#streamURL},
 * {@link Song#related}, {@link Song#chapters}, {@link Song#age_restricted}</info>
 */
class Song {
    /**
     * Create a Song
     * @param {ytdl.videoInfo|SearchResult|OtherSongInfo} info Raw info
     * @param {Discord.GuildMember?} member Requested user
     * @param {string} source Song source
     */
    constructor(info, member, source = "youtube") {
        var _a;
        if (typeof source !== "string" ||
            (info.src && typeof info.src !== "string")) {
            throw new __1.DisTubeError("INVALID_TYPE", "string", source, "source");
        }
        /**
         * The source of the song
         * @type {string}
         */
        this.source = (((_a = info) === null || _a === void 0 ? void 0 : _a.src) || source).toLowerCase();
        this._patchMember(member);
        if (this.source === "youtube") {
            this._patchYouTube(info);
        }
        else {
            this._patchOther(info);
        }
    }
    _patchYouTube(i) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // FIXME
        const info = i;
        if (info.full === true) {
            /**
             * Stream formats (Available if the song is from YouTube and playing)
             * @type {ytdl.videoFormat[]?}
             * @private
             */
            this.formats = info.formats;
            // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
            const err = require("@distube/ytdl-core/lib/utils").playError(info.player_response, [
                "UNPLAYABLE",
                "LIVE_STREAM_OFFLINE",
                "LOGIN_REQUIRED",
            ]);
            if (err)
                throw err;
            if (!((_a = info.formats) === null || _a === void 0 ? void 0 : _a.length))
                throw new __1.DisTubeError("UNAVAILABLE_VIDEO");
        }
        const details = info.videoDetails || info;
        /**
         * YouTube video id
         * @type {string?}
         */
        this.id = details.videoId || details.id;
        /**
         * Song name aka video title.
         * @type {string?}
         */
        this.name = details.title || details.name;
        /**
         * Indicates if the video is an active live.
         * @type {boolean}
         */
        this.isLive = !!details.isLive;
        /**
         * Song duration.
         * @type {number}
         */
        this.duration = this.isLive ? 0 : (0, __1.toSecond)(details.lengthSeconds || details.length_seconds || details.duration);
        /**
         * Formatted duration string (`hh:mm:ss`, `mm:ss` or `Live`).
         * @type {string?}
         */
        this.formattedDuration = this.isLive ? "Live" : (0, __1.formatDuration)(this.duration);
        /**
         * Song URL.
         * @type {string}
         */
        this.url = `https://www.youtube.com/watch?v=${this.id}`;
        /**
         * Stream / Download URL (Available if the song is playing)
         * @type {string?}
         */
        this.streamURL = undefined;
        /**
         * Song thumbnail.
         * @type {string?}
         */
        this.thumbnail =
            ((_b = details.thumbnails) === null || _b === void 0 ? void 0 : _b.sort((a, b) => b.width - a.width)[0].url) ||
                ((_c = details.thumbnail) === null || _c === void 0 ? void 0 : _c.url) ||
                details.thumbnail;
        /**
         * Related songs
         * @type {Song[]}
         */
        this.related = ((_d = info === null || info === void 0 ? void 0 : info.related_videos) === null || _d === void 0 ? void 0 : _d.map((v) => new Song(v))) || details.related || [];
        /**
         * Song views count
         * @type {number}
         */
        this.views = (0, __1.parseNumber)(details.viewCount || details.view_count || details.views);
        /**
         * Song like count
         * @type {number}
         */
        this.likes = (0, __1.parseNumber)(details.likes);
        /**
         * Song dislike count
         * @type {number}
         */
        this.dislikes = (0, __1.parseNumber)(details.dislikes);
        /**
         * Song uploader
         * @type {Object}
         * @prop {string?} name Uploader name
         * @prop {string?} url Uploader url
         */
        this.uploader = {
            name: ((_e = info.uploader) === null || _e === void 0 ? void 0 : _e.name) || ((_f = details.author) === null || _f === void 0 ? void 0 : _f.name),
            url: ((_g = info.uploader) === null || _g === void 0 ? void 0 : _g.url) || ((_h = details.author) === null || _h === void 0 ? void 0 : _h.channel_url) || ((_j = details.author) === null || _j === void 0 ? void 0 : _j.url),
        };
        /**
         * Whether or not an age-restricted content
         * @type {boolean}
         */
        this.age_restricted = !!details.age_restricted;
        /**
         * @typedef {Object} Chapter
         * @prop {string} title Chapter title
         * @prop {number} start_time Chapter start time in seconds
         */
        /**
         * Chapters information (YouTube only)
         * @type {Chapter[]}
         */
        this.chapters = details.chapters || [];
        /**
         * Song repost count
         * @type {number}
         */
        this.reposts = 0;
    }
    /**
     * Patch data from other source
     * @param {OtherSongInfo} info Video info
     * @private
     */
    _patchOther(info) {
        if (info.id)
            this.id = info.id;
        if (info.title)
            this.name = info.title;
        else if (info.name)
            this.name = info.name;
        this.isLive = Boolean(info.is_live || info.isLive);
        this.duration = this.isLive ? 0 : (0, __1.toSecond)(info._duration_raw || info.duration);
        this.formattedDuration = this.isLive ? "Live" : (0, __1.formatDuration)(this.duration);
        this.url = info.webpage_url || info.url;
        this.thumbnail = info.thumbnail;
        this.related = info.related || [];
        this.views = (0, __1.parseNumber)(info.view_count || info.views);
        this.likes = (0, __1.parseNumber)(info.like_count || info.likes);
        this.dislikes = (0, __1.parseNumber)(info.dislike_count || info.dislikes);
        this.reposts = (0, __1.parseNumber)(info.repost_count || info.reposts);
        this.uploader = {
            name: info.uploader,
            url: info.uploader_url,
        };
        this.age_restricted = info.age_restricted || (!!info.age_limit && (0, __1.parseNumber)(info.age_limit) >= 18);
        this.chapters = info.chapters || [];
    }
    /**
     * @param {Playlist} playlist Playlist
     * @param {Discord.GuildMember} [member] Requested user
     * @private
     * @returns {Song}
     */
    _patchPlaylist(playlist, member) {
        if (!(playlist instanceof Playlist_1.default))
            throw new __1.DisTubeError("INVALID_TYPE", "Playlist", playlist, "playlist");
        /**
         * The playlist added this song
         * @type {Playlist?}
         */
        this.playlist = playlist;
        return this._patchMember(member);
    }
    /**
     * @param {Discord.GuildMember} [member] Requested user
     * @private
     * @returns {Song}
     */
    _patchMember(member) {
        if (member) {
            /**
             * User requested
             * @type {Discord.GuildMember?}
             */
            this.member = member;
            /**
             * User requested
             * @type {Discord.User?}
             */
            this.user = member === null || member === void 0 ? void 0 : member.user;
        }
        return this;
    }
}
exports.Song = Song;
exports.default = Song;
//# sourceMappingURL=Song.js.map