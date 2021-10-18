const { red, blue, green, gray } = require('chalk');
require("dotenv").config();

module.exports = {
    login: class RexomLogin {
        constructor(props) {
            this.client = props.client;
            this.client.login(process.env.TOKEN).then(async function(token) {
                console.log(gray(require('figlet').textSync("NIRO", { font: "Blocks", width: 100, })));
                console.log(red.bold('Discord.JS Is Connect On: ') + green(token.split('.')[0] + '************************************'));
                console.log(blue.bold('https://discord.gg/developer-support') + red(' If You Need Support!!.'));
            }).catch(async function(error) {
                console.log(red.bold(error));
            });
        }
    },
    register: class RexomRegister {
        constructor(props) {
            this.client = props.client;
            this.dir = props.dir;
            this.commands = props.commands;
            this.player = props.player;

            require('../server/server');
            require('../models/events/loader').run(blue, red, this.client, this.dir);
            require('../models/commands/loader').run(blue, red, this.commands, this.dir);
            require('../models/slashCommands/loader').run(this.client);
            require('../models/music/loader').run(blue, red, this.player, this.dir);
        }
    },
}