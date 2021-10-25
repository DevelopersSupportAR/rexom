const { red, blue } = require('chalk');
const { Permissions } = require('discord.js');
const settings = require("./settings");
const db = require('quick.db');
const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyparser = require('body-parser');
const Strategy = require('passport-discord').Strategy;
const rootRoutes = require("./routes/root-routes");
const url = require('url');
const app = express();
const session = require("express-session");
const memorystore = require('memorystore')(session);
const PORT = process.env.PORT || settings.config.port;
const botConfig = require('../../config/bot.json');
const client = require('../client/discord');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
passport.use(new Strategy({
        clientID: settings.config.clientID,
        clientSecret: settings.config.secret,
        callbackURL: settings.config.collback,
        scope: ["identify", "guilds", "guilds.join"]
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile))
    }
))


app.use(session({
    store: new memorystore({ checkPeriod: 86400000 }),
    secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

let array = []

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "./public")));

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login")
}

app.get("/login", (req, res, next) => {
    if (!client) res.render('errors/808');
    if (req.session.backURL) {
        req.session.backURL = req.session.backURL
    } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname == app.locals.domain) {
            req.session.backURL = parsed.path
        }
    } else {
        req.session.backURL = "/"
    }
    next();
}, passport.authenticate("discord", { prompt: "none" }));

app.post("/dashboard/:guildID", checkAuth, async(req, res) => {
    console.log(req.body)
    if (!client) res.render('errors/808');
    const guild = client.guilds.cache.find(g => g.id == req.params.guildID);
    if (!guild) return res.render('errors/307');
    let user = guild.members.cache.find(u => u.id == req.user.id);
    if (!user) {
        user = await guild.members.fetch(req.user.id).then(u => {
            if (!u) {
                return res.render('errors/308');
            }
        });
    }
    if (!user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return res.render('errors/309');
    array.push(req.body)

    let settings = require('quick.db').fetch(`Settings_${req.params.guildID}`);
    let lang;

    if (['en', 'ar'].includes(req.body.lang)) lang = req.body.lang;
    else lang = settings.lang;
    require('quick.db').set(`DJ_${req.params.guildID}`, req.body.role ? req.body.role.split('<@&')[1].split('>')[0] : "")
    require('quick.db').set(`DefVol_${req.params.guildID}`, req.body.mxv || 50)
    require('quick.db').set(`DJ_TOG_${req.params.guildID}`, req.body.djTo || "off");
    if (req.body.djrole) require('quick.db').set(`DJ_${req.params.guildID}`, req.body.djrole);
    require('quick.db').set(`Settings_${req.params.guildID}`, {
        prefix: req.body.prefix || settings.prefix,
        lang: lang || settings.lang
    });


    console.log(array)

    res.render("settings", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        guild: guild,
        db: db,
        bot: client,
        permissions: Permissions,
        collback: require('./settings').config.collback,
        botconfig: botConfig,
        repeat: db.get(`SongDashData_${req.params.guildID}.repeat`),
        pause: db.get(`SongDashData_${req.params.guildID}.pause`),
        songs: db.get(`SongDashData_${req.params.guildID}.songs`)
    });
});

app.use("/", rootRoutes);

const http = require('http').createServer(app);
http.listen(PORT, () => console.log(blue('server is live on port: ') + red.bold(PORT)));