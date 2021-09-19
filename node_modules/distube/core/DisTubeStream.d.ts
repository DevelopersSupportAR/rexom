import { FFmpeg } from "prism-media";
import { StreamType } from "@discordjs/voice";
import type ytdl from "@distube/ytdl-core";
interface StreamOptions extends ytdl.downloadOptions {
    /**
     * Time to seek in seconds
     */
    seek?: number;
    /**
     * Additional FFmpeg arguments
     */
    ffmpegArgs?: string[];
    /**
     * If the stream url is live
     */
    isLive?: boolean;
}
export declare const chooseBestVideoFormat: (formats: ytdl.videoFormat[], isLive?: boolean) => ytdl.videoFormat;
/**
 * Create a stream to play with {@link DisTubeVoice}
 * @private
 */
export declare class DisTubeStream {
    /**
     * Create a stream from ytdl video formats
     * @param {ytdl.videoFormat[]} formats ytdl video formats
     * @param {StreamOptions} options options
     * @returns {DisTubeStream}
     * @private
     */
    static YouTube(formats: ytdl.videoFormat[] | undefined, options?: StreamOptions): DisTubeStream;
    /**
     * Create a stream from a stream url
     * @param {string} url stream url
     * @param {StreamOptions} options options
     * @returns {DisTubeStream}
     * @private
     */
    static DirectLink(url: string, options?: StreamOptions): DisTubeStream;
    type: StreamType.Raw;
    stream: FFmpeg;
    url: string;
    /**
     * Create a DisTubeStream to play with {@link DisTubeVoice}
     * @param {string} url Stream URL
     * @param {StreamOptions} options Stream options
     * @private
     */
    constructor(url: string, options: StreamOptions);
}
export default DisTubeStream;
//# sourceMappingURL=DisTubeStream.d.ts.map