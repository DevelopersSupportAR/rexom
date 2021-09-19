"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPSPlugin = exports.resolveHttpSong = exports.validateAudioURL = exports.getResponseHeaders = void 0;
const https_1 = __importDefault(require("https"));
const ExtractorPlugin_1 = __importDefault(require("../struct/ExtractorPlugin"));
const url_1 = require("url");
const __1 = require("..");
const getResponseHeaders = async (httpModule, url) => new Promise((resolve, reject) => {
    httpModule
        .get(url)
        .on("response", res => {
        resolve(res.headers);
    })
        .on("error", reject);
});
exports.getResponseHeaders = getResponseHeaders;
const validateAudioURL = async (httpModule, protocol, url) => {
    if (new url_1.URL(url).protocol.toLowerCase() !== protocol) {
        return false;
    }
    const headers = await (0, exports.getResponseHeaders)(httpModule, url), type = headers["content-type"];
    if (type === null || type === void 0 ? void 0 : type.startsWith("audio")) {
        return true;
    }
    return false;
};
exports.validateAudioURL = validateAudioURL;
// eslint-disable-next-line @typescript-eslint/require-await
const resolveHttpSong = async (source, url, member) => {
    url = url.replace(/\/+$/, "");
    return new __1.Song({
        name: url.substring(url.lastIndexOf("/") + 1).replace(/((\?|#).*)?$/, "") || url,
        url,
    }, member, source);
};
exports.resolveHttpSong = resolveHttpSong;
class HTTPSPlugin extends ExtractorPlugin_1.default {
    async validate(url) {
        return (0, exports.validateAudioURL)(https_1.default, "https:", url);
    }
    async resolve(url, member) {
        return (0, exports.resolveHttpSong)("https", url, member);
    }
}
exports.HTTPSPlugin = HTTPSPlugin;
exports.default = HTTPSPlugin;
//# sourceMappingURL=https.js.map