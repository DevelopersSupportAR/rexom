const fs = require('fs');

module.exports.run = (blue, red, client, dirname) => {
    fs.readdir(dirname + '/events/', (err, files) => {
        if (err) return console.log(err);
        let i = 0;
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const event = require(dirname + `/events/${file}`);
            let eventName = file.split('.')[0];
            client.on(eventName, event.bind(null, client));
            i++
        });
        console.log(blue("Loading DisApi Events \"") + red(i) + blue("\""));
    });
}