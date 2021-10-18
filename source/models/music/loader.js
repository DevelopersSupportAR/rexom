const fs = require('fs');

module.exports.run = (blue, red, player, dirname) => {
    fs.readdir(dirname + '/music/', (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(dirname + `/music/${file}`);
            let eventName = file.split('.')[0];
            console.log(blue("Loading Music Events \"") + red(eventName) + blue("\""));
            player.on(eventName, event.bind(null, player));
        });
    });
}