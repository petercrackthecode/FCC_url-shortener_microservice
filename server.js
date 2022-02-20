'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helper = require('./utils');
const URL = require('./database/Url');

const app = express();

// Basic Configuration
const PORT = process.env.PORT || 3000;

// process.cwd() prints out the current working directory

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('/', function (req, res, next) {
//     res.sendFile('/index.html');
// });

/** this project needs to parse POST bodies **/
app.post('/api/shorturl/', (req, res) => {
    let { url } = req.body;
    if (!helper.isUrlValid(url))
        return res.status(406).json({ error: 'invalid url' });

    url = helper.getValidUrlFormat(url);

    // take the first 10 characters of the encrypted substring
    const encryptedURL = helper.hashURL(url).substring(0, 9);

    URL.findOne({ shortenedURL: encryptedURL }, (err, foundURL) => {
        if (err)
            res.status(500).send({
                error: 'There was a problem finding the URL',
            });
        else if (!foundURL) {
            URL.create(
                { shortenedURL: encryptedURL, originalURL: url },
                (err) => {
                    if (err)
                        res.status(500).send({
                            error: 'Internal server problem',
                        });
                    res.status(200).json({
                        original_url: url,
                        short_url: encryptedURL,
                    });
                }
            );
        } else
            res.status(200).json({
                original_url: url,
                short_ur: foundURL.shortenedURL,
            });
    });
});

// redirection
app.get('/api/shorturl/:shortenedURL', (req, res) => {
    const { shortenedURL } = req.params;

    URL.findOne({ shortenedURL: shortenedURL }, (err, foundURL) => {
        console.log(foundURL);

        if (err) res.status(500).send({ error: 'Internel server problem' });
        else if (!foundURL) {
            res.status(404).sendFile(process.cwd() + '/views/404.html');
        } else {
            console.log(`originalURL = ${foundURL.originalURL}`);
            res.redirect(foundURL.originalURL);
        }
    });
});

app.listen(PORT, function () {
    console.log(`The Node server is running at port ${PORT}`);
});
