import https from "https";
import ExtractorPlugin from "../struct/ExtractorPlugin";
import { Song } from "..";
import type http from "http";
import type { GuildMember } from "discord.js";
export declare const getResponseHeaders: (httpModule: typeof http | typeof https, url: string) => Promise<http.IncomingHttpHeaders>;
export declare const validateAudioURL: (httpModule: typeof http | typeof https, protocol: string, url: string) => Promise<boolean>;
export declare const resolveHttpSong: (source: string, url: string, member: GuildMember) => Promise<Song>;
export declare class HTTPSPlugin extends ExtractorPlugin {
    validate(url: string): Promise<boolean>;
    resolve(url: string, member: GuildMember): Promise<Song>;
}
export default HTTPSPlugin;
//# sourceMappingURL=https.d.ts.map