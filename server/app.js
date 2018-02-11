const {resolve} = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const fs = require('fs');
const Promise = require('bluebird')
const write = Promise.promisify(fs.writeFile)
const stormStats = require('../public/storm_stats_converted')
const _ = require('lodash');
const api = require('./api')

db.sync({force: false}).then(() => {
	console.log('Database is synced')
});

// if (process.env.NODE_ENV !== 'production') require('../secrets')

app.use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
app.use(express.static(resolve(__dirname, '..', 'node_modules')))


//Other middlewear
if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api.router);

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

// Collapse stormStats by date
// if date & time is same, then avg lat, lon, wind, pressure
let stormData

for (var i=1; i<stormStats.length; i++) {
  let stormStatsObjs = stormStats.map(singleStat => {
    return Object.assign({},
      { day: singleStat[0],
        month: singleStat[1],
        time: singleStat[2],
        lat: singleStat[3],
        long: singleStat[4],
        wind: singleStat[5],
        pressure: singleStat[6],
        stormType: singleStat[7],
        category: singleStat[8],
      }
    )
  })
// Source: https://stackoverflow.com/questions/36454604/lodash-aggregating-and-reducing-array-of-objects-based-on-date
 _.values(_.reduce(stormStatsObjs,function(result,obj){
    var dateTime = obj.month + ", " + obj.day + ", " + obj.time
    result[dateTime] = {
      dateTime: dateTime,
      lat: (obj.lat + (result[dateTime] ? result[dateTime].lat : obj.lat))/2,
      long: (obj.long + (result[dateTime] ? result[dateTime].long : obj.long))/2,
      wind: (obj.wind + (result[dateTime] ? result[dateTime].wind : obj.wind))/2,
      pressure: (obj.pressure + (result[dateTime] ? result[dateTime].pressure : obj.pressure))/2,
    };
    stormData = result
    return result;
  },{}))
}

const {groupedById} = require('./api/index')

// let stormDataDayHours = Object.keys(stormData).split(', ')
//500 error middlewear
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});



// function convertDateStorm(arr){
//   let newArr = arr.map((subArr, idx) => {
//     if (idx < 10){
//       console.log('loook', subArr[4].slice(0, -4))
//     }
//     return subArr[0].split('-').concat(subArr[1].slice(0, 2)).concat(subArr[2].slice(0,-1)).concat(subArr[3].slice(0,-1)).concat(subArr[4].slice(0, -4)).concat(subArr[5].slice(0, -3)).concat(subArr.slice(6))
//   })
//   let convertToNum = newArr.map(subArr => {
//     return subArr.map((el, idx) => {
//       if (idx !== 1 && idx !== 7){
//         if (idx === 8 && el === '-'){
//           return el
//         }
//         return Number(el)
//       }
//       return el
//     })
//   })
//   return convertToNum
// }

// write('./server/drifterDataHour.js', JSON.stringify(newDrifter, null, 4))
// .then(console.log('wrote file!'))
// .catch(console.error)

// write('./server/drifter_stats_converted.js', JSON.stringify(newDrifter, null, 4))
// .then(console.log('wrote file!'))
// .catch(console.error)


