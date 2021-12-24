
<div align="center">
  <img src="https://media.discordapp.net/attachments/743880363331420241/902711609112264804/unknown.png" align="center">
  <br>
  <h3>Music bots are always what gives an artistic touch to servers, but <b>Rexom 🎵</b> gives a different touch.</h3> 
  <br>
  <a href="#">
    <img src="https://img.shields.io/github/v/tag/DevelopersSupportAR/rexom?color=red&label=rexom&logo=discord&style=for-the-badge" alt="Support">
  <br>
  <br>
<br>
  <a href="https://discord.gg/developer-support">
    <img src="https://img.shields.io/discord/800447810864152596.svg?label=Discord&logo=Discord&colorB=7289da&style=for-the-badge" alt="Support">
  </a>
  <a href="#">
    <img src="https://img.shields.io/node/v/discord.js?color=blue&label=node&logo=javascript&style=for-the-badge" alt="Support">
    </a>
    <a href="#">
    <img src="https://img.shields.io/npm/v/distube?label=Distube&logo=npm&style=for-the-badge" alt="Support">
    </a>
    <a href="#">
    <img src="https://img.shields.io/npm/v/discord.js?label=DISCORD.JS&logo=npm&style=for-the-badge" alt="Support">
    <a href="#">
    <img src="https://img.shields.io/github/issues/DevelopersSupportAR/rexom?logo=github&style=for-the-badge" alt="Support">
    </a>
    <a href="#">
    <img src="https://img.shields.io/github/commit-activity/m/DevelopersSupportAR/rexom?logo=github&style=for-the-badge" alt="Support">
    </a>
</div>


## Features ✨

There are many advantages that make you use reXom!!

1. First Bot using `discord-buttons` like a controle panle
2. Support's all new Discord interactions Updates (discord-buttons, slash-commands, context menu)
3. Save Playlist on the bot database
4. possibility to control all bot settings with commands (change prefix, change lang ['ar', 'en'], dj role)
5. 30+ commands
6. supports `700+` online music websites like Spotify and Soundcloud
7. fast discord api connection
8. fast sqlite databases
9. distinguished message collector to play music
10. simple dashboard support any domains

## some photos if the bot 🖼

<img src="" align="center" style="weight: 500px"/>

## how to use reXom 🛠️

its easy to use rexom :)

#### Requirements 📜

1. Make You won discord bot

first go to [Discord Developer Portal](https://discord.com/developers/applications/)
login with your discord account
press `new appliactin`
type the appliactin name and press `Create`
set your appliactin/bot icon and description/about me
choose form the navbar in the left `Bot` option
press `add bot` and `yes, do it!`
Make sure the `PRESENCE INTENT` and `SERVER MEMBERS INTENT` options are enabled
then chose form the navbar in the right `OAuth2`
scroll down and chose `bot` and `applications.commands` options then scroll down more and choose the bot permissions you won't i suggest the `Administrator` permissions then copy the url(this is the bot invite url) and invite it

2. make sure you have [Git](https://git-scm.com/downloads), [VS Code](https://code.visualstudio.com/download), [nodejs](https://nodejs.org/en/download/current/) in your pc (this is only required if you using computer)


#### Get Started 🚀

if you using your computer follow my steps!

1. press right click any ware in your disktop and chose `git bash here`
2. then he well open a cmd for you type this command inside: `git clone https://github.com/DevelopersSupportAR/rexom.git`
3. after that he will fork the github repo, okay now go inside the forked folder with this command: `cd rexom`
4. find a folder could `config` and open the `bot.json` file (make sure if you using computer to open this file with `VS Code`)
5. you well find thar thing like this:

```json
{
  "activity": {
    "name": "<The Bot Activity Name (that waht is the bot will type in his activity)>",
    "type": "<The Bot Activity Type (that what is the bot activity type  will be ['PLAYING', 'LISTENING', 'WATCHING', 'COMPETING'])>"
  },
  "status": "<The Bot Status (that what is the bot status will be ['dnd', 'online', 'idle])>",

  "domain": "<The Bot Website Domain (the dashboard domain)>",
  "clientID": "<The Bot Id (that you will find it in the OAuth2)>",
  "clientSECRET": "<The Bot Secret (that you will find it in the OAuth2)>",

  "mainPrefix": "<The Bot Prefix (that what the bot will starts commands)>",
  "mainLang": "<The Bot Lang, only: ['ar', 'en']>",
  "ownerID": "<The Onwer Id (this is importing for sent the full updates for the bot)>",

  "panelType": "<the type of the contorle panel ['buttons', 'reactions', 'none']>",
  "replyType": "<the type of bot reply ['embeds', 'messages']>",

  "leaveOnEmpty": "<if you won't to make the bot leave the voice channel when the queue is empty but 'true' if not but 'false'>",
  "leaveOnStop": "<if you won't to make the bot leave the voice channel when you type the stop command but 'true' if ot but 'false'>",
  "leaveOnFinish": "<if you won't to make the leave the voice channel when it's done type 'true' if not type 'false'>",
  "searchSongs": "<type how many songs you son't the bot send it the search menu if you don't wont the search menu type 0>",
  "api": {
    "spotify": {
      "clientID": "<if you have an spotify clientID if not but none>",
      "clientSECRET": "if you have an spotify client secret if not but none"
    }
  }
}
```

when you finaly edit it go to `.env` file
you well find thar thing like this:

```
TOKEN="<The Bot Token Right Here(you will find it on discord developer portal)"
```

if you using replit just go to `secrits` on right
and set `TOKEN` as a key
then set `The Bot Token Right Here(you will find it on discord developer portal)` as a value
now go to [Discord Developer Portal](https://discord.com/developers/applications/) from the side bar on the left choose `OAuth2` and but a redirect url
its have to like you domain link and `/callback` like this `https://<The Project Name>.<Your Username>.repl.co/callback`

#### Run The Project 🌀

if you are using replit just press run button on the top;
but if you are using you computer or vps you will find an file cold `run.bat` open it and jsut wait;

any problim go to [developer-support](https://discord.gg/developer-support)


## Made By 🔌

`@ニロ#3121`
