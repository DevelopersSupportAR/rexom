const SoundCloudPlugin = require("@distube/soundcloud");
const SpotifyPlugin = require("@distube/spotify");
const client = require("./discord");
const {
  leaveOnEmpty,
  leaveOnStop,
  leaveOnFinish,
  searchSongs,
} = require("../../config/bot.json");

// checker
if (![true, false].includes(Boolean(leaveOnEmpty))) leaveOnEmpty = true;
if (![true, false].includes(Boolean(leaveOnStop))) leaveOnStop = true;
if (![true, false].includes(Boolean(leaveOnFinish))) leaveOnFinish = true;
if (Number(searchSongs) > 20) searchSongs = 20;
if (isNaN(Number(searchSongs))) searchSongs = 0;

const DisTube = require("disrexom");
const player = new DisTube.default(client, {
  leaveOnEmpty: Boolean(leaveOnEmpty),
  leaveOnStop: Boolean(leaveOnStop),
  leaveOnFinish: Boolean(leaveOnFinish),
  searchSongs: Number(searchSongs),
  youtubeDL: true,
  updateYouTubeDL: true,
  plugins: [new SoundCloudPlugin.default(), new SpotifyPlugin.default()],
});

player.setMaxListeners(0);

module.exports = player;
