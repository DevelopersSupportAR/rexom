const express = require('express');
const app = new express();
const chalk = require('chalk');
const pages = __dirname + '/pages';

app.get('/', async function(req, res) {
    res.sendFile(pages + '/index.html');
});

app.get('*', async function(req, res) {
    res.sendFile(pages + '/errors/404.html');
});

app.listen(process.env.PORT || 3000, () => console.log(chalk.red.bold('Express server is online')));