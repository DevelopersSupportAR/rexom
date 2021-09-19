"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
const DisTubeBase_1 = __importDefault(require("../DisTubeBase"));
const __1 = require("../..");
const discord_js_1 = require("discord.js");
/**
 * Manages the collection of a data model.
 * @abstract
 * @private
 */
class BaseManager extends DisTubeBase_1.default {
    constructor(distube) {
        super(distube);
        /**
         * Collection of of a data model.
         * @type {Discord.Collection}
         */
        this.collection = new discord_js_1.Collection();
    }
    add(id, data) {
        const existing = this.get(id);
        if (existing) {
            return existing;
        }
        this.collection.set(id, data);
        return data;
    }
    get(idOrInstance) {
        return this.collection.get((0, __1.resolveGuildID)(idOrInstance));
    }
    delete(idOrInstance) {
        this.collection.delete((0, __1.resolveGuildID)(idOrInstance));
    }
    has(idOrInstance) {
        return this.collection.has((0, __1.resolveGuildID)(idOrInstance));
    }
}
exports.BaseManager = BaseManager;
exports.default = BaseManager;
//# sourceMappingURL=BaseManager.js.map