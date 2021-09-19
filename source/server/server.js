const { red, blue } = require('chalk');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('*', (req, res) => res.send('404!.'));

app.listen(PORT, () => console.log(blue('Express server is live on port: ') + red.bold(PORT)));

module.exports = "NIRO";