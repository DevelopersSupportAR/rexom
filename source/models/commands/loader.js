const fs = require('fs');

module.exports.run = (blue, red, commands, dirname) => {
    fs.readdir(dirname + `/commands/`, (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const command = require(dirname + `/commands/${file}`);
            let commandName = file.split('.')[0];
            console.log(blue("Loading Command \"") + red(commandName) + blue("\""));
            commands.set(command.name, command);
        });
    });
}