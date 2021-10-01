import type ytdl from "@distube/ytdl-core";
import type { CustomPlugin, DisTubeOptions, ExtractorPlugin, Filters } from "..";
export declare class Options {
    plugins: (CustomPlugin | ExtractorPlugin)[];
    emitNewSongOnly: boolean;
    leaveOnFinish: boolean;
    leaveOnStop: boolean;
    leaveOnEmpty: boolean;
    emptyCooldown: number;
    savePreviousSongs: boolean;
    searchSongs: number;
    searchCooldown: number;
    youtubeCookie?: string;
    youtubeIdentityToken?: string;
    youtubeDL: boolean;
    updateYouTubeDL: boolean;
    customFilters: Filters;
    ytdlOptions: ytdl.getInfoOptions;
    nsfw: boolean;
    emitAddSongWhenCreatingQueue: boolean;
    emitAddListWhenCreatingQueue: boolean;
    constructor(options: DisTubeOptions);
    private _validateOptions;
}
export default Options;
//# sourceMappingURL=DisTubeOptions.d.ts.map