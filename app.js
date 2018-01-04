const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
const url = 'mongodb://BuoyBuddy:BuoyBuddy2018@ds241677.mlab.com:41677/buoybuddy';
//Use this for local db 'mongodb://localhost:27017/buoybuddy'

app.use(bodyParser());
app.use(express.static('public'));
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
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
app.get('/favorites', (req,res) => {
    MongoClient.connect(url, function(err, db){
        assert.equal(null,err);
        const buoyBuddyDb = db.db('buoybuddy');
        const favorites = buoyBuddyDb.collection('favorites');
        favorites
        .find({})
        .toArray(function(error, documents) {
            if (error) {
                res.sendStatus(400);
                db.close();
            } else {
                res.send(documents);
                db.close();
            }
        })
    })
})
app.post('/favorites/:id', (req,res) => {
    MongoClient.connect(url, function(err, db){
        assert.equal(null,err);
        const buoyBuddyDb = db.db('buoybuddy');
        const favorites = buoyBuddyDb.collection('favorites');
        favorites
        .insertOne({
          id: req.params.id
        }, function(error, results){
          if (error){
            db.close();
            res.sendStatus(400);
          } else {
            db.close();
            res.sendStatus(200);
          }
        })
    })
});
app.delete('/favorites/:id', (req,res) => {
    MongoClient.connect(url, function(err, db){
        assert.equal(null,err);
        const buoyBuddyDb = db.db('buoybuddy');
        const favorites = buoyBuddyDb.collection('favorites');
        favorites
        .deleteOne({
          id: req.params.id
        }, function(error, results){
          if (error){
            db.close();
            res.sendStatus(400);
          } else {
            db.close();
            res.sendStatus(200);
          }
        })
    })
});
app.delete('/favorites', (req,res) => {
    MongoClient.connect(url, function(err, db){
        assert.equal(null,err);
        const buoyBuddyDb = db.db('buoybuddy');
        const favorites = buoyBuddyDb.collection('favorites');
        favorites
        .deleteMany({}, function(error, results){
          if (error){
            db.close();
            res.sendStatus(400);
          } else {
            db.close();
            res.sendStatus(200);
          }
        })
    })
});

app.listen(3001);