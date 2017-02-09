const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const config = require('./libs/config');

const app = new express();
const compiler = webpack(webpackConfig);
const port = config.get('port');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const UserModel = require('./libs/mongoose').UserModel;
const MarkerModel = require('./libs/mongoose').MarkerModel;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.get('jwtSecret')
};

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    UserModel.findOne({_id: jwt_payload.id}, (err, user) => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("==>  Listening on port %s.", port);
    }
});



app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({username}, (err, user) => {
        if(err) {
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.sendStatus(500);
        }
        if(user) {
            console.error('Login is used req.body=', req.body);
            return res.status(409).send('Login is used!');
        }
        const userModel = new UserModel({
            username,
            password
        });

        userModel.save(function (err) {
            if (!err) {
                console.info('user created');
                const payload = {id: userModel._id};
                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                return res.send({message: "ok", token, user: userModel});
            } else {
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.sendStatus(500);
            }
        });
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findOne({username, password}, (err, user) => {
        if (!user) {
            res.status(401).json({message:"no such user found"});
        } else {
            const payload = {id: user.id};
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token, user});
        }
    });
});

app.post('/markers', passport.authenticate('jwt', { session: false }), function(req, res){
    const markersForSave = req.body.filter(item => {
        return !item._id;
    });
    const markersWithId = req.body.filter(item => {
        return item._id;
    });
    MarkerModel.insertMany(markersForSave, (err, markers) => {
        if (err) {
            res.status(500).json({message:"Server error"});
        } else {
            res.json({message: "ok", markers: [...markersWithId, ...markers]});
        }
    })
});

app.get('/markers', passport.authenticate('jwt', { session: false }), function(req, res){
    MarkerModel.find({username: req.user.username}, function(err, markers) {
        if (err) {
            res.status(500).json({message:"Server error"});
        } else {
            res.json({message: "ok", markers});
        }
    });
});

//check token
app.get('/secret', passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
});

app.get("/secretDebug",
    function(req, res, next){
        console.log(req.get('Authorization'));
        next();
    },
    function(req, res){
        res.json("debugging");
    }
);


app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});