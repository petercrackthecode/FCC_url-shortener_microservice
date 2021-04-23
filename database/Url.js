const mongoose = require('mongoose');
mongoose.set("useFindAndModify", false);

const URL = new mongoose.Schema({
    originalURL: String,
    shortenedURL: String
});

mongoose.model("URL", URL);

module.exports = mongoose.model("URL");