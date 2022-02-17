const fs = require("fs");

module.exports.run = (blue, red, commands, dirname) => {
  let i = 0;
  fs.readdirSync(dirname + "/commands/").forEach(async (dir) => {
    fs.readdir(`${dirname}/commands/${dir}/`, async (err, files) => {
      if (err) return console.log(err);
      files
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
          let command = require(`${dirname}/commands/${dir}/${file}`);
          if (command) commands.set(command?.name, command);
          i++;
        });
    });
  });
  setTimeout(() => {
    console.log(blue('Loading Bot Commands "') + red(i) + blue('"'));
  }, 1567);
};
