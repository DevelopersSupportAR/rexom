import { TypedEmitter } from "tiny-typed-emitter";
import { DisTubeHandler, DisTubeVoiceManager, Options, Playlist, Queue, QueueManager, SearchResult } from ".";
import type { Client, GuildMember, Message, StageChannel, TextChannel, VoiceChannel } from "discord.js";
import type { CustomPlugin, DisTubeEvents, DisTubeOptions, ExtractorPlugin, Filters, GuildIDResolvable, Song } from ".";
/**
 * DisTube class
 * @extends EventEmitter
 */
export declare class DisTube extends TypedEmitter<DisTubeEvents> {
    handler: DisTubeHandler;
    options: Options;
    client: Client;
    queues: QueueManager;
    voices: DisTubeVoiceManager;
    extractorPlugins: ExtractorPlugin[];
    customPlugins: CustomPlugin[];
    filters: Filters;
    /**
     * Create a new DisTube class.
     * @param {Discord.Client} client Discord.JS client
     * @param {DisTubeOptions} [otp] Custom DisTube options
     * @example
     * const Discord = require('discord.js'),
     *     DisTube = require('distube'),
     *     client = new Discord.Client();
     * // Create a new DisTube
     * const distube = new DisTube.default(client, { searchSongs: 10 });
     * // client.DisTube = distube // make it access easily
     * client.login("Your Discord Bot Token")
     */
    constructor(client: Client, otp?: DisTubeOptions);
    /**
     * Shorthand method for {@link DisTube#playVoiceChannel}
     * @returns {Promise<void>}
     * @param {Discord.Message} message A message from guild channel
     * @param {string|Song|SearchResult|Playlist} song URL | Search string |
     * {@link Song} | {@link SearchResult} | {@link Playlist}
     * @param {Object} [options] Optional options
     * @param {boolean} [options.skip=false] Skip the playing song (if exists) and play the added song/playlist instantly
     * @param {boolean} [options.unshift=false] Add the song/playlist to the beginning of the queue
     * (after the playing song if exists)
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "play")
     *         distube.play(message, args.join(" "));
     * });
     */
    play(message: Message, song: string | Song | SearchResult | Playlist, options?: {
        skip?: boolean;
        unshift?: boolean;
    }): Promise<void>;
    /**
     * Play / add a song or playlist from url. Search and play a song if it is not a valid url.
     * Emit {@link DisTube#addList}, {@link DisTube#addSong} or {@link DisTube#playSong} after executing
     * @returns {Promise<void>}
     * @param {Discord.VoiceChannel|Discord.StageChannel} voiceChannel The voice channel will be joined
     * @param {string|Song|SearchResult|Playlist} song URL | Search string |
     * {@link Song} | {@link SearchResult} | {@link Playlist}
     * @param {Object} [options] Optional options
     * @param {boolean} [options.skip=false] Skip the playing song (if exists) and play the added song/playlist instantly
     * @param {boolean} [options.unshift=false] Add the song/playlist to the beginning of the queue
     * (after the playing song if exists)
     * @param {Discord.GuildMember} [options.member] Requested user (default is your bot)
     * @param {Discord.TextChannel} [options.textChannel] Default {@link Queue#textChannel} (if the queue wasn't created)
     * @param {Discord.Message} [options.message] Called message (For built-in search events. If this is a {@link https://developer.mozilla.org/en-US/docs/Glossary/Falsy|falsy value}, it will play the first result instead)
     */
    playVoiceChannel(voiceChannel: VoiceChannel | StageChannel, song: string | Song | SearchResult | Playlist | null, options?: {
        skip?: boolean;
        unshift?: boolean;
        member?: GuildMember;
        textChannel?: TextChannel;
        message?: Message;
    }): Promise<void>;
    /**
     * <info>Shorthand method of {@link DisTubeHandler#createCustomPlaylist} and {@link DisTube#playVoiceChannel}
     *
     * If you doesn't have a user message (interaction,...),
     * see {@link DisTubeHandler#createCustomPlaylist} example</info>
     *
     * Play or add array of video urls.
     * {@link DisTube#event:playSong} or {@link DisTube#event:addList} will be emitted
     * with `playlist`'s properties include `properties` parameter's properties such as
     * `user`, `songs`, `duration`, `formattedDuration`, `thumbnail` like {@link Playlist}
     * @returns {Promise<void>}
     * @param {Discord.Message} message A message from guild channel
     * @param {Array<string|Song|SearchResult>} songs Array of url, Song or SearchResult
     * @param {Object} [properties={}] Additional properties such as `name`
     * @param {Object} [options] Optional options
     * @param {boolean} [options.skip=false] Skip the playing song (if exists) and play the added song/playlist instantly
     * @param {boolean} [options.unshift=false] Add the song/playlist to the beginning of the queue
     * (after the playing song if exists)
     * @param {boolean} [options.parallel=true] Whether or not fetch the songs in parallel
     * @example
     *     const songs = ["https://www.youtube.com/watch?v=xxx", "https://www.youtube.com/watch?v=yyy"];
     *     distube.playCustomPlaylist(message, songs, { name: "My playlist name" });
     *     // Fetching custom playlist sequentially (reduce lag for low specs)
     *     distube.playCustomPlaylist(message, songs, { name: "My playlist name" }, false, false);
     */
    playCustomPlaylist(message: Message, songs: Array<string | Song | SearchResult>, properties?: any, options?: {
        skip?: boolean;
        unshift?: boolean;
        parallel?: boolean;
    }): Promise<void>;
    /**
     * Search for a song.
     * You can customize how user answers instead of send a number.
     * Then use {@link DisTube#play} or {@link DisTube#playVoiceChannel} to play it.
     * @param {string} string The string search for
     * @param {Object} options Search options
     * @param {number} [options.limit=10] Limit the results
     * @param {'video'|'playlist'} [options.type='video'] Type of results (`video` or `playlist`).
     * @param {boolean} [options.safeSearch=false] Whether or not use safe search (YouTube restricted mode)
     * @throws {Error}
     * @returns {Promise<Array<SearchResult>>} Array of results
     */
    search(string: string, options?: {
        type?: "video" | "playlist";
        limit?: number;
        safeSearch?: boolean;
        retried?: boolean;
    }): Promise<Array<SearchResult>>;
    /**
     * Get the guild queue
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Queue?}
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "queue") {
     *         const queue = distube.getQueue(message);
     *         message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
     *             `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
     *         ).join("\n"));
     *     }
     * });
     */
    getQueue(queue: GuildIDResolvable): Queue | undefined;
    /**
     * Pause the guild stream
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Queue} The guild queue
     * @throws {Error}
     */
    pause(queue: GuildIDResolvable): Queue;
    /**
     * Resume the guild stream
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Queue} The guild queue
     * @throws {Error}
     */
    resume(queue: GuildIDResolvable): Queue;
    /**
     * Stop the guild stream
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Promise<void>}
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "stop") {
     *         distube.stop(message);
     *         message.channel.send("Stopped the queue!");
     *     }
     * });
     */
    stop(queue: GuildIDResolvable): Promise<void>;
    /**
     * Set the guild stream's volume
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @param {number} percent The percentage of volume you want to set
     * @returns {Queue} The guild queue
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "volume")
     *         distube.setVolume(message, Number(args[0]));
     * });
     */
    setVolume(queue: GuildIDResolvable, percent: number): Queue;
    /**
     * Skip the playing song if there is a next song in the queue.
     * <info>If {@link Queue#autoplay} is `true` and there is no up next song,
     * DisTube will add and play a related song.</info>
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Promise<Song>} The new Song will be played
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "skip")
     *         distube.skip(message);
     * });
     */
    skip(queue: GuildIDResolvable): Promise<Song>;
    /**
     * Play the previous song
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Promise<Song>} The new Song will be played
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "previous")
     *         distube.previous(message);
     * });
     */
    previous(queue: GuildIDResolvable): Promise<Song>;
    /**
     * Shuffle the guild queue songs
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Promise<Queue>} The guild queue
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "shuffle")
     *         distube.shuffle(message);
     * });
     */
    shuffle(queue: GuildIDResolvable): Promise<Queue>;
    /**
     * Jump to the song number in the queue.
     * The next one is 1, 2,...
     * The previous one is -1, -2,...
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @param {number} num The song number to play
     * @returns {Promise<Queue>} The guild queue
     * @throws {Error} if `num` is invalid number (0 < num < {@link Queue#songs}.length)
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "jump")
     *         distube.jump(message, parseInt(args[0]))
     *             .catch(err => message.channel.send("Invalid song number."));
     * });
     */
    jump(queue: GuildIDResolvable, num: number): Promise<Queue>;
    /**
     * Set the repeat mode of the guild queue.\
     * Toggle mode `(Disabled -> Song -> Queue -> Disabled ->...)` if `mode` is `undefined`
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @param {RepeatMode?} [mode] The repeat modes (toggle if `undefined`)
     * @returns {RepeatMode} The new repeat mode
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "repeat") {
     *         let mode = distube.setRepeatMode(message, parseInt(args[0]));
     *         mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
     *         message.channel.send("Set repeat mode to `" + mode + "`");
     *     }
     * });
     * @example
     * const { RepeatMode } = require("distube");
     * let mode;
     * switch(distube.setRepeatMode(message, parseInt(args[0]))) {
     *     case RepeatMode.DISABLED:
     *         mode = "Off";
     *         break;
     *     case RepeatMode.SONG:
     *         mode = "Repeat a song";
     *         break;
     *     case RepeatMode.QUEUE:
     *         mode = "Repeat all queue";
     *         break;
     * }
     * message.channel.send("Set repeat mode to `" + mode + "`");
     */
    setRepeatMode(queue: GuildIDResolvable, mode?: number): number;
    /**
     * Toggle autoplay mode
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {boolean} Autoplay mode state
     * @throws {Error}
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command == "autoplay") {
     *         const mode = distube.toggleAutoplay(message);
     *         message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
     *     }
     * });
     */
    toggleAutoplay(queue: GuildIDResolvable): boolean;
    /**
     * Add related song to the queue
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @returns {Promise<Song>} The guild queue
     */
    addRelatedSong(queue: GuildIDResolvable): Promise<Song>;
    /**
     * Enable or disable filter(s) of the queue.
     * Available filters: {@link Filters}
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @param {string|false} filter A filter name, `false` to clear all the filters
     * @param {boolean} [force=false] Force enable the input filter(s) even if it's enabled
     * @returns {Array<string>} Enabled filters.
     * @example
     * client.on('message', (message) => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
     *         const filter = distube.setFilter(message, command);
     *         message.channel.send("Current queue filter: " + (filter.join(", ") || "Off"));
     *     }
     * });
     */
    setFilter(queue: GuildIDResolvable, filter: string | false, force?: boolean): Array<string>;
    /**
     * Set the playing time to another position
     * @param {GuildIDResolvable} queue The type can be resolved to give a {@link Queue}
     * @param {number} time Time in seconds
     * @returns {Queue} Seeked queue
     * @example
     * client.on('message', message => {
     *     if (!message.content.startsWith(config.prefix)) return;
     *     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
     *     const command = args.shift();
     *     if (command = 'seek')
     *         distube.seek(message, Number(args[0]));
     * });
     */
    seek(queue: GuildIDResolvable, time: number): Queue;
    /**
     * Emit error event
     * @param {Error} error error
     * @param {Discord.TextChannel?} channel Text channel where the error is encountered.
     * @private
     */
    emitError(error: Error, channel?: TextChannel): void;
}
export default DisTube;
/**
 * Emitted after DisTube add a new playlist to the playing {@link Queue}.
 *
 * @event DisTube#addList
 * @param {Queue} queue The guild queue
 * @param {Playlist} playlist Playlist info
 * @example
 * distube.on("addList", (queue, playlist) => queue.textChannel.send(
 *     `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
 * ));
 */
/**
 * Emitted after DisTube add a new song to the playing {@link Queue}.
 *
 * @event DisTube#addSong
 * @param {Queue} queue The guild queue
 * @param {Song} song Added song
 * @example
 * distube.on("addSong", (queue, song) => queue.textChannel.send(
 *     `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`
 * ));
 */
/**
 * Emitted when there is no user in the voice channel,
 * {@link DisTubeOptions}.leaveOnEmpty is `true` and there is a playing queue.
 *
 * If there is no playing queue (stopped and {@link DisTubeOptions}.leaveOnStop is `false`),
 * it will leave the channel without emitting this event.
 * @event DisTube#empty
 * @param {Queue} queue The guild queue
 * @example
 * distube.on("empty", queue => queue.textChannel.send("Channel is empty. Leaving the channel"))
 */
/**
 * Emitted when DisTube encounters an error.
 *
 * @event DisTube#error
 * @param {Discord.TextChannel} channel Text channel where the error is encountered.
 * @param {Error} error The error encountered
 * @example
 * distube.on("error", (channel, error) => channel.send(
 *     "An error encountered: " + error
 * ));
 */
/**
 * Emitted when there is no more song in the queue and {@link Queue#autoplay} is `false`.
 * DisTube will leave voice channel if {@link DisTubeOptions}.leaveOnFinish is `true`.
 *
 * @event DisTube#finish
 * @param {Queue} queue The guild queue
 * @example
 * distube.on("finish", queue => queue.textChannel.send("No more song in queue"));
 */
/**
 * Emitted when DisTube initialize a queue to change queue default properties.
 *
 * @event DisTube#initQueue
 * @param {Queue} queue The guild queue
 * @example
 * distube.on("initQueue", queue => {
 *     queue.autoplay = false;
 *     queue.volume = 100;
 * });
 */
/**
 * Emitted when {@link Queue#autoplay} is `true`, {@link Queue#songs} is empty,
 * and DisTube cannot find related songs to play.
 *
 * @event DisTube#noRelated
 * @param {Queue} queue The guild queue
 * @example
 * distube.on("noRelated", queue => queue.textChannel.send("Can't find related video to play."));
 */
/**
 * Emitted when DisTube play a song.
 *
 * If {@link DisTubeOptions}.emitNewSongOnly is `true`,
 * this event is not emitted when looping a song or next song is the previous one.
 *
 * @event DisTube#playSong
 * @param {Queue} queue The guild queue
 * @param {Song} song Playing song
 * @example
 * distube.on("playSong", (queue, song) => queue.textChannel.send(
 *     `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
 * ));
 */
/**
 * Emitted when DisTube cannot find any results for the query.
 *
 * @event DisTube#searchNoResult
 * @param {Discord.Message} message The user message called play method
 * @param {string} query The search query
 * @example
 * distube.on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`));
 */
/**
 * Emitted when {@link DisTubeOptions|DisTubeOptions.searchSongs} bigger than 0,
 * and song param of {@link DisTube#playVoiceChannel} is invalid url.
 * DisTube will wait for user's next message to choose a song manually.
 * <info>{@link https://support.google.com/youtube/answer/7354993|Safe search} is enabled
 * if {@link DisTubeOptions}.nsfw is disabled and the message's channel is not a nsfw channel.</info>
 *
 * @event DisTube#searchResult
 * @param {Discord.Message} message The user message called play method
 * @param {Array<SearchResult>} results Searched results
 * @param {string} query The search query
 * @example
 * // DisTubeOptions.searchSongs > 0
 * distube.on("searchResult", (message, results) => {
 *     message.channel.send(`**Choose an option from below**\n${
 *         results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
 *     }\n*Enter anything else or wait 60 seconds to cancel*`);
 * });
 */
/**
 * Emitted when {@link DisTubeOptions|DisTubeOptions.searchSongs} bigger than 0,
 * and the search canceled due to {@link DisTubeOptions|DisTubeOptions.searchTimeout}.
 *
 * @event DisTube#searchCancel
 * @param {Discord.Message} message The user message called play method
 * @param {string} query The search query
 * @example
 * // DisTubeOptions.searchSongs > 0
 * distube.on("searchCancel", (message) => message.channel.send(`Searching canceled`));
 */
/**
 * Emitted when {@link DisTubeOptions|DisTubeOptions.searchSongs} bigger than 0,
 * and the search canceled due to user's next message is not a number or out of results range.
 *
 * @event DisTube#searchInvalidAnswer
 * @param {Discord.Message} message The user message called play method
 * @param {Discord.Message} answer The answered message of user
 * @param {string} query The search query
 * @example
 * // DisTubeOptions.searchSongs > 0
 * distube.on("searchInvalidAnswer", (message) => message.channel.send(`You answered an invalid number!`));
 */
/**
 * Emitted when {@link DisTubeOptions|DisTubeOptions.searchSongs} bigger than 0,
 * and after the user chose a search result to play.
 *
 * @event DisTube#searchDone
 * @param {Discord.Message} message The user message called play method
 * @param {Discord.Message} answer The answered message of user
 * @param {string} query The search query
 */
/**
 * Emitted when the bot is disconnected to a voice channel.
 *
 * @event DisTube#disconnect
 * @param {Queue} queue The guild queue
 */
/**
 * Emitted when a {@link Queue} is deleted with any reasons.
 *
 * @event DisTube#deleteQueue
 * @param {Queue} queue The guild queue
 */
/**
 * Emitted when DisTube finished a song.
 *
 * @event DisTube#finishSong
 * @param {Queue} queue The guild queue
 * @param {Song} song Finished song
 */
//# sourceMappingURL=DisTube.d.ts.map