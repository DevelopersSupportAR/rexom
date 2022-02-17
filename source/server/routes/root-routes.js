const express = require("express");
const router = express.Router();
const { Permissions, Client } = require("discord.js");
const settings = require("../settings");
const passport = require("passport");
const botConfig = require("../../../config/bot.json");
const client = require("../../client/discord");
const db = require("quick.db");
const player = require("../../client/player");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.backURL = req.url;
  res.redirect("/login");
};

router.get("/play/:guildID", (req, res) => {
  let interaction =
    require("../../interactions/music/play").interactionGET ||
    require("../../commands/music/play").messageGET ||
    require("../../interactions/music/search").interactionGET ||
    require("../../commands/music/search").messageGET ||
    require("../../interactions/music/play-playlist").interactionGET ||
    require("../../commands/music/play-playlist").messageGET ||
    require("../../events/messageCreate").messageGET;
  let songURL = null;
  if (interaction && interaction.guild?.id == req.params.guildID) {
    let queue = player.getQueue(interaction);
    songURL = queue?.songs?.map((v, i, a) => v).slice(0, 1)[0]?.streamURL;
    setTimeout(() => {
      res.render("music/index", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        bot: client,
        song: songURL,
      });
    }, Number(queue.songs?.map((v, i, a) => v).slice(0, 1)[0]?.duration) + 444);
  }
  let parms = req.query?.song;
  if (!parms) return res.send({ err: "please provide a song url" });
  setTimeout(() => {
    res.render("music/index", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      bot: client,
      song: songURL,
    });
  }, 1400);
});

router.get("/", (req, res) => {
  if (!client) res.render("errors/808");
  res.render("index", {
    req: req,
    user: req.isAuthenticated() ? req.user : null,
    bot: client,
    permissions: Permissions,
    websiteconfig: settings.webiste,
    collback: settings.config.collback,
    botconfig: botConfig,
  });
});

router.get("/logout", (req, res) => {
  if (!client) res.render("errors/808");
  req.session.destroy(() => {
    req.logout();
    res.redirect("/");
  });
});

router.get(
  "/callback",
  passport.authenticate("discord", { fallureRedirect: "/" }),
  async (req, res) => {
    if (!client) res.render("errors/808");
    res.redirect("/dashboard");
  }
);

router.get("/dashboard", (req, res) => {
  if (!client) res.render("errors/808");
  if (!req.isAuthenticated() || !req.user) return res.redirect("/login");
  if (!req.user.guilds)
    return res.redirect(
      `/?error=` + encodeURIComponent("Dashboard_Can't_Get_Your_Guilds_Data")
    );
  res.render("dashboard", {
    req: req,
    user: req.isAuthenticated() ? req.user : null,
    bot: client,
    permissions: Permissions,
    websiteconfig: settings.webiste,
    collback: settings.config.collback,
    botconfig: botConfig,
  });
});

router.get("/commands", (req, res) => {
  if (!client) res.render("errors/808");
  res.render("commands", {
    req: req,
    user: req.isAuthenticated() ? req.user : null,
    bot: client,
    db: db,
    botconfig: botConfig,
    commands: [
      {
        name: "dj",
        category: "ADMIN",
        description: "change the dj role and the dj toggle",
        useg: "/dj @role <'on' or 'off'>",
        example: "/dj @dj-role on",
      },
      {
        name: "info",
        category: "ADMIN",
        description: "preview an advanced info of the bot status",
        useg: "/info",
        example: "/info",
      },
      {
        name: "join",
        category: "ADMIN",
        description: "stay in the room you are in 24/7",
        useg: "/join",
        example: "/join",
      },
      {
        name: "lang",
        category: "ADMIN",
        description: "change the bot langauge in your server",
        useg: "/lang <'ar' or 'en'>",
        example: "/lang en",
      },
      {
        name: "leave",
        category: "ADMIN",
        description: "leave the channel you are in",
        useg: "/leave",
        example: "/leave",
      },
      {
        name: "prefix",
        category: "ADMIN",
        description: "change the bot prefix in your server",
        useg: "/prefix <the new prefix>",
        example: "/prefix r?",
      },
      {
        name: "setup",
        category: "ADMIN",
        description: "makes a channel to play all you type in there",
        useg: "/setup",
        example: "/setup",
      },
      {
        name: "temp",
        category: "ADMIN",
        description: "setup a category for temp channels",
        useg: "/temp",
        example: "/temp",
      },
      {
        name: "help",
        category: "BASE",
        description: "preview the bot commands list",
        useg: "/help",
        example: "/help",
      },
      {
        name: "ping",
        category: "BASE",
        description: "preview the bot ping",
        useg: "/ping",
        example: "/ping",
      },
      {
        name: "devs",
        category: "UTILITIES",
        description: "preview the bot devs",
        useg: "/devs",
        example: "/devs",
      },
      {
        name: "filter",
        category: "UTILITIES",
        description: "add a filter to music",
        useg: "/filter",
        example: "/filter",
      },
      {
        name: "music-data",
        category: "UTILITIES",
        description: "preview all the advanced details of the playing song",
        useg: "/music-data",
        example: "/music-data",
      },
      {
        name: "say",
        category: "UTILITIES",
        description: "makes the bot say and world",
        useg: "/say <the world>",
        example: "/say hello world",
      },
      {
        name: "tiktok",
        category: "UTILITIES",
        description: "preview all ticktok details",
        useg: "/tiktok <the song url>",
        example:
          "/tiktok https://www.tiktok.com/@bassant33/video/7063165112483351814",
      },
      {
        name: "youtube-together",
        category: "UTILITIES",
        description: "whatch youtube in a voice channel",
        useg: "/youtube-together",
        example: "/youtube-together",
      },
      {
        name: "autoplay",
        description: "auto play music with the same beat of the playing one",
        category: "MUSIC",
        useg: "/autoplay",
        example: "/autoplay",
      },
      {
        name: "delete-playlits",
        description: "delete your saved playlist",
        category: "MUSIC",
        useg: "/delete-playlits <playlist name>",
        example: "/delete-playlits myList",
      },
      {
        name: "jump",
        description: "jump for spacific song in the queue",
        category: "MUSIC",
        useg: "/jump <song number>",
        example: "/jump 4",
      },
      {
        name: "list-playlist",
        description: "list of your saved playlists",
        category: "MUSIC",
        useg: "/list-playlist",
        example: "/list-playlist",
      },
      {
        name: "loop",
        description: "change the looping type",
        category: "MUSIC",
        useg: "/loop <the loop type have to be 'off' or 'repeat song' or 'repeat queue'>",
        example: "/loop repeat song",
      },
      {
        name: "lyrics",
        description: "gives you the playing song lyrics",
        category: "MUSIC",
        useg: "/lyrics",
        example: "/lyrics",
      },
      {
        name: "nowplaying",
        description: "gives you the info of the playing song",
        category: "MUSIC",
        useg: "/nowplaying",
        example: "/nowplaying",
      },
      {
        name: "pause",
        description: "pause the music",
        category: "MUSIC",
        useg: "/pause",
        example: "/pause",
      },
      {
        name: "play-playlist",
        description: "play your saved playlist",
        category: "MUSIC",
        useg: "/play-playlist <list name>",
        example: "/play-playlist myList",
      },
      {
        name: "play",
        description: "play the music",
        category: "MUSIC",
        useg: "/play <song name or url>",
        example: "/play https://www.youtube.com/watch?v=Bznxx12Ptl0",
      },
      {
        name: "queue",
        description: "preview the playing queue",
        category: "MUSIC",
        useg: "/queue",
        example: "/queue",
      },
      {
        name: "resume",
        description: "resume the paused music",
        category: "MUSIC",
        useg: "/resume",
        example: "/resume",
      },
      {
        name: "save-playlist",
        description: "save the playing queue to a playlist in the bot",
        category: "MUSIC",
        useg: "/save-playlist <playlist name>",
        example: "/save-playlist myList",
      },
      {
        name: "search",
        description: "search for a music",
        category: "MUSIC",
        useg: "/search <song name>",
        example: "/search wegz",
      },
      {
        name: "seek",
        description: "seek the music",
        category: "MUSIC",
        useg: "/seek <the time with s>",
        example: "/seek 60",
      },
      {
        name: "stop",
        description: "stop the playing music",
        category: "MUSIC",
        useg: "/stop",
        example: "/stop",
      },
      {
        name: "volume",
        description: "edit the music volume",
        category: "MUSIC",
        useg: "/volume <the new vol>",
        example: "/volume 45.5",
      },
    ],
  });
});

router.get("/dashboard/:guildID", checkAuth, async (req, res) => {
  if (!client) res.render("errors/808");
  const guild = client.guilds.cache.find((g) => g.id == req.params.guildID);
  if (!guild) return res.render("errors/307");
  let user = guild.members.cache.find((u) => u.id == req.user.id);
  if (!user) {
    user = await guild.members.fetch(req.user.id).then((u) => {
      if (!u) {
        return res.render("errors/308");
      }
    });
  }
  if (!user.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    return res.render("errors/309");

  let interaction =
    require("../../interactions/music/play").interactionGET ||
    require("../../commands/music/play").messageGET ||
    require("../../interactions/music/search").interactionGET ||
    require("../../commands/music/search").messageGET ||
    require("../../interactions/music/play-playlist").interactionGET ||
    require("../../commands/music/play-playlist").messageGET ||
    require("../../events/messageCreate").messageGET;
  let songURL = null;
  if (interaction && interaction.guild?.id == req.params.guildID) {
    let queue = player.getQueue(interaction);
    songURL = queue?.songs?.map((v, i, a) => v).slice(0, 1)[0]?.streamURL;
  }
  setTimeout(() => {
    res.render("settings", {
      req: req,
      user: req.isAuthenticated() ? req.user : null,
      guild: guild,
      db: db,
      bot: client,
      permissions: Permissions,
      collback: settings.config.collback,
      botconfig: botConfig,
      repeat: db.get(`SongDashData_${req.params.guildID}.repeat`),
      pause: db.get(`SongDashData_${req.params.guildID}.pause`),
      songs: db.get(`SongDashData_${req.params.guildID}.songs`),
      song: songURL,
    });
  }, 444);
});

router.get("/features", (req, res) => {
  if (!client) res.render("errors/808");
  res.render("features", {
    req: req,
    user: req.isAuthenticated() ? req.user : null,
    bot: client,
    db: db,
    botconfig: botConfig,
  });
});

router.get("*", (req, res) => {
  if (!client) res.render("errors/808");
  res.render("errors/404");
});

module.exports = router;
