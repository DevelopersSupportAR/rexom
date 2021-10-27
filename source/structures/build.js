const { red, blue, green, yellow } = require('chalk');
require("dotenv").config();

module.exports = {
    login: class RexomLogin {
        constructor(props) {
            try {
                this.client = props.client;
                this.client.login(process.env.TOKEN).then(async function(token) {
                    console.log(yellow.bold(require('figlet').textSync("Rexom")));
                    console.log(red.bold('Discord.JS Is Connect On: ') + green(token.split('.')[0] + '****************'));
                    console.log(blue.bold('https://discord.gg/developer-support') + red(' If You Need Support!!.'));
                }).catch(async function(error) {
                    console.log(red.bold(error));
                });
            } catch {
                console.log('rexom')
            }
        }
    },
    register: class RexomRegister {
        constructor(props) {
            try {
                this.client = props.client;
                this.dir = props.dir;
                this.commands = props.commands;
                this.player = props.player;

                require('../server/server');
                require('../models/events/loader').run(blue, red, this.client, this.dir);
                require('../models/commands/loader').run(blue, red, this.commands, this.dir);
                require('../models/slashCommands/loader').run(this.client);
                require('../models/music/loader').run(blue, red, this.player, this.dir);
            } catch {
                console.log('rexom')
            }
        }
    },
}