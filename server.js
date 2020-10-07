const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
require('newrelic');

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use(express.static('public', {
    etag: true,
    index: false,
    dotfiles: 'deny',
    maxAge: '4h',
    redirect: false,
    cacheControl: true,
    lastModified: true,
    extensions: ['js', 'css']
}));

app.get('/*', (req, res) => {

    res.sendFile(path.join(__dirname + '/wwwroot/index.html'), {
        maxAge: '4h',
        dotfiles: 'deny'
    });
});

app.listen(process.env.PORT || 8080);
