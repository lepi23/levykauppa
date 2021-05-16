const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const port = 4001;
const MongoClient = require('mongodb').MongoClient;
dotenv.config()
const dbUrl =
  "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.o9ghq.mongodb.net/levytDb?retryWrites=true&w=majority";

const app = express();

/* --------------------------------
 *    APP CONFIG
 * -------------------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

//mainpage
app.get('/', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('levykauppaData');
      const collection = db.collection('levyt');
      collection
        .find()
        .toArray()
        .then((results) => {
          res.render('index.ejs', { levyt: results });
        })
        .catch((error) => {
          res.redirect('/');
        });
    });
  });
//suomilevyt
app.get('/suomilevyt', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('levykauppaData');
      const collection = db.collection('suomilevyt');
      collection
        .find()
        .toArray()
        .then((results) => {
          res.render('finnishRecords.ejs', { suomilevyt: results });
        })
        .catch((error) => {
          res.redirect('/');
        });
    });
  });
  app.get('/ulkomaiset_levyt', (req, res) => {
    MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
      if (err) return console.error(err);
      const db = client.db('levykauppaData');
      const collection = db.collection('ulkomaiset_levyt');
      collection
        .find()
        .toArray()
        .then((results) => {
          res.render('foreignRecords.ejs', { ulkomaiset_levyt: results });
        })
        .catch((error) => {
          res.redirect('/');
        });
    });
  });
/* --------------------------------
 *    START SERVER
 * -------------------------------- */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  