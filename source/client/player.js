const SoundCloudPlugin = require('@distube/soundcloud');
const SpotifyPlugin = require('@distube/spotify');
const client = require('./discord');

const DisTube = require('disrexom');
const player = new DisTube.default(client, {
    leaveOnEmpty: false,
    leaveOnStop: true,
    leaveOnFinish: false,
    searchSongs: 0,
    youtubeDL: true,
    updateYouTubeDL: true,
    plugins: [new SoundCloudPlugin.default(), new SpotifyPlugin.default()]
});

player.setMaxListeners(0);

module.exports = player;