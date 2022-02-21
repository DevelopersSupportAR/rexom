const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp")
const client = require("./discord");
let {
  leaveOnEmpty,
  leaveOnStop,
  leaveOnFinish,
  YTDLP,
  searchSongs,
  api,
} = require("../../config/bot.json");

// checker
if (!["true", "false"].includes(leaveOnEmpty)) leaveOnEmpty = true;
if (!["true", "false"].includes(leaveOnStop)) leaveOnStop = true;
if (!["true", "false"].includes(leaveOnFinish)) leaveOnFinish = true;
if (!["true", "false"].includes(YTDLP)) YTDLP = false;
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
    youtubeDL: Boolean(YTDLP),
    updateYouTubeDL: Boolean(YTDLP),
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin()],
  });
} else {
  player = new DisTube.default(client, {
    leaveOnEmpty: Boolean(leaveOnEmpty),
    leaveOnStop: Boolean(leaveOnStop),
    leaveOnFinish: Boolean(leaveOnFinish),
    searchSongs: Number(searchSongs),
    youtubeDL: Boolean(YTDLP),
    updateYouTubeDL: Boolean(YTDLP),
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
      new YtDlpPlugin()
    ],
  });
}

player.setMaxListeners(0);

module.exports = player;
