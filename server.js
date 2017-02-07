const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');

const app = new express();
const compiler = webpack(webpackConfig);
const config = require('./libs/config');
const port = config.get('port');

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});

const UserModel = require('./libs/mongoose').UserModel;

app.post('/api/user', function(req, res) {
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
                return res.send({ status: 'OK', user: userModel });
            } else {
                console.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.sendStatus(500);
            }
        });
    });
});

app.get('/api/user', function(req, res) {
    const username = req.query.username;
    const password = req.query.password;
    UserModel.findOne({username, password}, (err, user) => {
        if (!err) {
            return res.send({ status: 'OK', user });
        } else {
            console.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.sendStatus(500);
        }
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});