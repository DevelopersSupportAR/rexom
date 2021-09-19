import ExtractorPlugin from "../struct/ExtractorPlugin";
import type { GuildMember } from "discord.js";
export declare class HTTPPlugin extends ExtractorPlugin {
    validate(url: string): Promise<boolean>;
    resolve(url: string, member: GuildMember): Promise<import("..").Song>;
}
export default HTTPPlugin;
//# sourceMappingURL=http.d.ts.map