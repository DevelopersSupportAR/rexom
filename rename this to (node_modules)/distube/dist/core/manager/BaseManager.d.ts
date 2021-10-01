import DisTubeBase from "../DisTubeBase";
import { Collection } from "discord.js";
import type { DisTube, GuildIDResolvable } from "../..";
/**
 * Manages the collection of a data model.
 * @abstract
 * @private
 */
export declare abstract class BaseManager<V> extends DisTubeBase {
    collection: Collection<string, V>;
    constructor(distube: DisTube);
    add(id: string, data: V): V;
    get(idOrInstance: GuildIDResolvable): V | undefined;
    delete(idOrInstance: GuildIDResolvable): void;
    has(idOrInstance: GuildIDResolvable): boolean;
}
export default BaseManager;
//# sourceMappingURL=BaseManager.d.ts.map