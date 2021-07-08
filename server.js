const express = require('express');
const port = process.env.PORT || 4001;
const bodyParser = require('body-parser');
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
  res.render('index.ejs');
});

//suomilevyt
app.get('/suomilevyt', (req, res) => {
  res.render('finnishRecords.ejs');
});

//ulkomaiset levyt
app.get('/ulkomaiset_levyt', (req, res) => {
  res.render('foreignRecords.ejs');
});
//muut

app.get('/muut', (req, res) => {
  res.render('otherStuff.ejs');
});

//
/* --------------------------------
 *    START SERVER
 * -------------------------------- */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  