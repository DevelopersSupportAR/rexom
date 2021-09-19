# @distube/soundcloud

SoundCloud extractor plugin for [DisTube.js.org](https://distube.js.org).
Required DisTube version >= 3.0.0.

# Feature

- Using SoundCloud API
- Support tracks, playlist
- Search tracks/playlists
- Faster than `youtube-dl` extractor

# Installation

```sh
npm install @distube/soundcloud
```

# Documentation

### new SoundCloudPlugin()

Create a DisTube's `ExtractorPlugin`

### SoundCloudPlugin.search(query, [type], [limit]) _(Both `static` and `class` method)_

Searches for the given query on SoundCloud.

- Parameters

  - `query` [string] Search query.
  - `type` [string]: Type of results (`track` or `playlist`). Default is `track`.
  - `limit` [integer]: Limit the results. Default is `10`.

- Returns a `Promise<Song[]|Playlist[]>`
  - Returns a `Promise<Song[]>` if `type` parameter is `track`
  - Returns a `Promise<Playlist[]>` if `type` parameter is `playlist`

# Usage

### Plugin

```js
const Discord = require("discord.js");
const DisTube = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const client = new Discord.Client();
const distube = new DisTube(client, {
  searchSongs: 10,
  emitNewSongOnly: true,
  plugins: [new SoundCloudPlugin()],
});

// Now distube.play can play soundcloud url.

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift();
  if (command === "play") distube.play(message, args.join(" "));
});
```

### Search

```js
const { SoundCloudPlugin } = require("@distube/soundcloud");
SoundCloudPlugin.search("A SoundCloud Track"); // static method
// Returns an array of 10 DisTube's Songs

const scPlugin = new SoundCloudPlugin();
scPlugin.search("A SoundCloud Playlist", "playlist", 3); // class method
// Returns an array of 3 DisTube's Playlist
```
