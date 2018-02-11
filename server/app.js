const {resolve} = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const fs = require('fs');
const Promise = require('bluebird')
const write = Promise.promisify(fs.writeFile)

db.sync({force: false}).then(() => {
	console.log('Database is synced')
});

// if (process.env.NODE_ENV !== 'production') require('../secrets')

app.use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
app.use(express.static(resolve(__dirname, '..', 'node_modules')))
// app.use('/api', require('./routes/api'));

//Other middlewear
if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('/key', function (req, res, next) {
  res.json(process.env.SCORE_POST_KEY)
})

app.get('*', function (req, res, next) {
  res.sendFile(resolve(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.PORT || 1910;
const server = app.listen(port, function () {
  console.log('Server is listening...');
  console.log('http://localhost:1910/');
});

//500 error middlewear
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const {drifter} = require('../drifter_data.js')

console.log('drifterpre!', drifter.slice(0,15))

function convertDecToHour(arr){
  let newArr = arr.map(subArr => {
    return subArr.slice(0,2).concat(subArr[2].split('.')).concat(subArr.slice(3))
  })
  let hourConverted = newArr.map(subArr => {
    return subArr.slice(0,3).concat(Math.round((subArr[3] / 416), 2)).concat(subArr.slice(4))
  })
  return hourConverted
}

let newDrifter = convertDecToHour(drifter)

write('./server/drifterDataHour.js', JSON.stringify(newDrifter, null, 4))
.then(console.log('wrote file!'))
.catch(console.error)
