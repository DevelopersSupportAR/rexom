import type ytpl from "@distube/ytpl";
import type { PlaylistInfo, Song } from "..";
import type { GuildMember, User } from "discord.js";
/**
 * Class representing a playlist.
 * @prop {string} source Playlist source
 */
export declare class Playlist implements PlaylistInfo {
    source: string;
    member?: GuildMember;
    user?: User;
    songs: Song[];
    name: string;
    url?: string;
    thumbnail?: string;
    [x: string]: any;
    /**
     * Create a playlist
     * @param {Song[]|PlaylistInfo} playlist Playlist
     * @param {Discord.GuildMember} member Requested user
     * @param {Object} properties Custom properties
     */
    constructor(playlist: Song[] | ytpl.result | PlaylistInfo, member?: GuildMember, properties?: any);
    /**
     * Playlist duration in second.
     * @type {number}
     */
    get duration(): number;
    /**
     * Formatted duration string `hh:mm:ss`.
     * @type {string}
     */
    get formattedDuration(): string;
    /**
     * @param {?Discord.GuildMember} [member] Requested user
     * @private
     * @returns {Playlist}
     */
    _patchMember(member?: GuildMember): Playlist;
}
export default Playlist;
//# sourceMappingURL=Playlist.d.ts.map