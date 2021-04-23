const shajs = require('sha.js');

const hashURL = (url) => {
    return new shajs.sha256().update(url).digest('hex');
};

const isUrlValid = (url) => {
    const url_reg = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$', 'gi');
    return url_reg.test(url);
};

const getValidUrlFormat = (url) => {
    const http_reg = new RegExp('(http://|https://)', 'gi');
    if (!http_reg.test(url))
        url = "https://" + url;
    return url;
}

module.exports = {isUrlValid, hashURL, getValidUrlFormat};