const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
const port = 3000;

const compiler = webpack(config);

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser());

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/test', function(req, res) {
    console.error('/test', req.body);
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });
    res.send('response !!!!');
});

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});