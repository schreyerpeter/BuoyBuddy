const express = require('express');
const path = require('path');
//const logger = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'))
app.use(bodyParser());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

app.get('/buoys', (req,res) => {
    request('http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
        else res.sendStatus(400);
    });
});


app.listen(process.env.PORT || 3001);