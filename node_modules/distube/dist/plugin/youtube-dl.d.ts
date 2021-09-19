import ExtractorPlugin from "../struct/ExtractorPlugin";
import { Playlist, Song } from "../struct";
import type { GuildMember } from "discord.js";
export declare class YouTubeDLPlugin extends ExtractorPlugin {
    constructor(updateYouTubeDL?: boolean);
    validate(): Promise<boolean>;
    resolve(url: string, member: GuildMember): Promise<Song | Playlist>;
    getStreamURL(url: string): Promise<string>;
}
export default YouTubeDLPlugin;
//# sourceMappingURL=youtube-dl.d.ts.map