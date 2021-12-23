const fs = require('fs');

module.exports.run = (blue, red, commands, dirname) => {
    fs.readdir(dirname + `/commands/`, (error, files) => {
        if (error) return console.log(error);
        let i = 0;
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const command = require(dirname + `/commands/${file}`);
            commands.set(command.name, command);
            i++
        });
        console.log(blue("Loading Bot Commands \"") + red(i) + blue("\""))
    });
}