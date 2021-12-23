const { glob } = require("glob");
const slashCommandsMap = new Map();
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports.run = async(client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/source/slashCommands/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        slashCommandsMap.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async() => {
        await client.application.commands.set(arrayOfSlashCommands);
    });
};

module.exports.slashCommandsMap = slashCommandsMap;