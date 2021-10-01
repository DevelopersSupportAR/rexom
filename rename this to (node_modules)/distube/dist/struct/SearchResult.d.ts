import type { Playlist, Video } from "@distube/ytsr";
/** Class representing a search result. */
export declare class SearchResult {
    source: "youtube";
    type: "video" | "playlist";
    id: string;
    name: string;
    url: string;
    views?: number;
    isLive?: boolean;
    duration?: number;
    formattedDuration?: string;
    thumbnail?: string;
    /** Video or playlist uploader */
    uploader: {
        /** Uploader name */
        name?: string;
        /** Uploader url */
        url?: string;
    };
    /**
     * Create a search result
     * @param {Object} info ytsr result
     */
    constructor(info: Video | Playlist);
}
export default SearchResult;
//# sourceMappingURL=SearchResult.d.ts.map