const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const client = require("./discord");
let {
  leaveOnEmpty,
  leaveOnStop,
  leaveOnFinish,
  searchSongs,
  api,
} = require("../../config/bot.json");

// checker
if (![true, false].includes(Boolean(leaveOnEmpty))) leaveOnEmpty = true;
if (![true, false].includes(Boolean(leaveOnStop))) leaveOnStop = true;
if (![true, false].includes(Boolean(leaveOnFinish))) leaveOnFinish = true;
if (Number(searchSongs) > 20) searchSongs = 20;
if (isNaN(Number(searchSongs))) searchSongs = 0;
let player;
const DisTube = require("disrexom");
if (api.spotify.clientID == "none" || api.spotify.clientSECRET == "none") {
  player = new DisTube.default(client, {
    leaveOnEmpty: Boolean(leaveOnEmpty),
    leaveOnStop: Boolean(leaveOnStop),
    leaveOnFinish: Boolean(leaveOnFinish),
    searchSongs: Number(searchSongs),
    youtubeDL: true,
    updateYouTubeDL: true,
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
  });
} else {
  player = new DisTube.default(client, {
    leaveOnEmpty: Boolean(leaveOnEmpty),
    leaveOnStop: Boolean(leaveOnStop),
    leaveOnFinish: Boolean(leaveOnFinish),
    searchSongs: Number(searchSongs),
    youtubeDL: true,
    updateYouTubeDL: true,
    plugins: [
      new SoundCloudPlugin(),
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: false,
        api: {
          clientId: api.spotify.clientID,
          clientSecret: api.spotify.clientSECRET,
        },
      }),
    ],
  });
}

player.setMaxListeners(0);

module.exports = player;
