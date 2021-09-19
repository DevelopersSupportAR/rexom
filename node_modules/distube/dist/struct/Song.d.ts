import Playlist from "./Playlist";
import type ytdl from "@distube/ytdl-core";
import type { GuildMember, User } from "discord.js";
import type { Chapter, OtherSongInfo, SearchResult } from "..";
/**
 * Class representing a song.
 *
 * <info>If {@link Song} is added from a YouTube {@link SearchResult} or {@link Playlist},
 * some info will be missing to save your resources. It will be filled when emitting {@link DisTube#playSong} event.
 *
 * Missing info: {@link Song#likes}, {@link Song#dislikes}, {@link Song#streamURL},
 * {@link Song#related}, {@link Song#chapters}, {@link Song#age_restricted}</info>
 */
export declare class Song {
    source: string;
    formats?: ytdl.videoFormat[];
    member?: GuildMember;
    user?: User;
    id?: string;
    name?: string;
    isLive: boolean;
    duration: number;
    formattedDuration?: string;
    url: string;
    streamURL?: string;
    thumbnail?: string;
    related: Song[];
    views: number;
    likes: number;
    dislikes: number;
    uploader: {
        name?: string;
        url?: string;
    };
    age_restricted: boolean;
    chapters: Chapter[];
    reposts: number;
    playlist?: Playlist;
    /**
     * Create a Song
     * @param {ytdl.videoInfo|SearchResult|OtherSongInfo} info Raw info
     * @param {Discord.GuildMember?} member Requested user
     * @param {string} source Song source
     */
    constructor(info: ytdl.videoInfo | SearchResult | OtherSongInfo | ytdl.relatedVideo, member?: GuildMember, source?: string);
    _patchYouTube(i: ytdl.videoInfo | SearchResult): void;
    /**
     * Patch data from other source
     * @param {OtherSongInfo} info Video info
     * @private
     */
    private _patchOther;
    /**
     * @param {Playlist} playlist Playlist
     * @param {Discord.GuildMember} [member] Requested user
     * @private
     * @returns {Song}
     */
    _patchPlaylist(playlist: Playlist, member?: GuildMember): Song;
    /**
     * @param {Discord.GuildMember} [member] Requested user
     * @private
     * @returns {Song}
     */
    _patchMember(member?: GuildMember): Song;
}
export default Song;
//# sourceMappingURL=Song.d.ts.map