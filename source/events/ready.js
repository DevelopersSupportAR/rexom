const { red, blue, green } = require('chalk');

module.exports = async(client) => {
    require('../functions/readyFunction').get(client, red, blue);
};