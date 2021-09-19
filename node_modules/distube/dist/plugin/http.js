"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPPlugin = void 0;
const http_1 = __importDefault(require("http"));
const ExtractorPlugin_1 = __importDefault(require("../struct/ExtractorPlugin"));
const __1 = require("..");
class HTTPPlugin extends ExtractorPlugin_1.default {
    async validate(url) {
        return (0, __1.validateAudioURL)(http_1.default, "http:", url);
    }
    async resolve(url, member) {
        return (0, __1.resolveHttpSong)("http", url, member);
    }
}
exports.HTTPPlugin = HTTPPlugin;
exports.default = HTTPPlugin;
//# sourceMappingURL=http.js.map