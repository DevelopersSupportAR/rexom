"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YouTubeDLPlugin = void 0;
const youtube_dl_1 = __importStar(require("@distube/youtube-dl"));
const ExtractorPlugin_1 = __importDefault(require("../struct/ExtractorPlugin"));
const struct_1 = require("../struct");
class YouTubeDLPlugin extends ExtractorPlugin_1.default {
    constructor(updateYouTubeDL = true) {
        super();
        if (updateYouTubeDL) {
            /* eslint-disable no-console */
            (0, youtube_dl_1.download)()
                .then((version) => console.log(`[DisTube] Updated youtube-dl to ${version}!`))
                .catch(console.error)
                .catch(() => console.warn("[DisTube] Unable to update youtube-dl, using default version."));
            /* eslint-enable no-console */
        }
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    async validate() {
        return true;
    }
    async resolve(url, member) {
        const info = await (0, youtube_dl_1.default)(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            preferFreeFormats: true,
        }).catch(e => {
            throw new Error(`[youtube-dl] ${e.stderr || e}`);
        });
        if (Array.isArray(info.entries) && info.entries.length > 0) {
            info.source = info.extractor.match(/\w+/)[0];
            info.songs = info.entries.map((i) => new struct_1.Song(i, member, i.extractor));
            return new struct_1.Playlist(info, member);
        }
        return new struct_1.Song(info, member, info.extractor);
    }
    async getStreamURL(url) {
        const info = await (0, youtube_dl_1.default)(url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            preferFreeFormats: true,
        }).catch(e => {
            throw new Error(`[youtube-dl] ${e.stderr || e}`);
        });
        return info.url;
    }
}
exports.YouTubeDLPlugin = YouTubeDLPlugin;
exports.default = YouTubeDLPlugin;
//# sourceMappingURL=youtube-dl.js.map