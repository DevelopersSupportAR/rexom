const fs = require('fs');

module.exports.run = (blue, red, client, dirname) => {
    fs.readdir(dirname + '/events/', (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(dirname + `/events/${file}`);
            let eventName = file.split('.')[0];
            console.log(blue("Loading Events \"") + red(eventName) + blue("\""));
            client.on(eventName, event.bind(null, client));
        });
    });
}