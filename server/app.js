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

// Collapse stormStats by date
// if date & time is same, then avg lat, lon, wind, pressure
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
      lat: (obj.lat + (result[dateTime] ? result[dateTime].lat : 0))/2, 
      long: (obj.long + (result[dateTime] ? result[dateTime].long : 0))/2,
      wind: (obj.wind + (result[dateTime] ? result[dateTime].wind : 0))/2,
      pressure: (obj.pressure + (result[dateTime] ? result[dateTime].pressure : 0))/2,
    };
    // console.log(result)
    return result;
  },{}));

}

//500 error middlewear
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// function convertDecToHour(arr){
//   let newArr = arr.map(subArr => {
//     return subArr.slice(0,2).concat(subArr[2].split('.')).concat(subArr.slice(3))
//   })
//   let hourConverted = newArr.map(subArr => {
//     return subArr.slice(0,3).concat(Math.round((subArr[3] / 416), 2)).concat(subArr.slice(4))
//   })
//   let numerifiedArr = hourConverted.map(subArr => {
//     return subArr.map(el => {
//       return Number(el)
//     })
//   })
//   return numerifiedArr
// }

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

const {drifter} = require('./drifter_stats_converted.js')
const _ = require('lodash')

let septemberDrifters = drifter.filter(row => {
  return row[1] === 9
})

let drifterObjects = septemberDrifters.map(singleDrifter => {
  return Object.assign({}, {id: singleDrifter[0], month: singleDrifter[1], day: singleDrifter[2], hour:singleDrifter[3],year: singleDrifter[4], long: singleDrifter[5], lat: singleDrifter[6], qualIdx: singleDrifter[7]})
})

let groupedById = _.groupBy(drifterObjects, function(obj){
  return obj.id
})

Object.keys(groupedById).forEach(key => {
  groupedById[key] = _.groupBy(groupedById[key], (obj) => {
    return obj.day
  })
})

Object.keys(groupedById).forEach(id => {
  Object.keys(groupedById[id]).forEach(day => {
    groupedById[id][day] = _.groupBy(groupedById[id][day], (obj) => {
      return obj.hour
    })
  })
})

Object.keys(groupedById).forEach(id => {
  Object.keys(groupedById[id]).forEach(day => {
    let hourOuter
    let length
    Object.keys(groupedById[id][day]).forEach(hour => {
      length = groupedById[id][day][hour].length
      hourOuter = hour
      groupedById[id][day][hour] = groupedById[id][day][hour].reduce(function (output, obj) {
        if (!output['long']) {
          output['long'] = obj['long']
        } else {
          output['long'] += obj['long']
        }
        if (!output['lat']) {
          output['lat'] = obj['lat']
        } else {
          output['lat'] += obj['lat']
        }
        return output;
      }, {})
    })
    groupedById[id][day][hourOuter].long = groupedById[id][day][hourOuter].long/length
    groupedById[id][day][hourOuter].lat = groupedById[id][day][hourOuter].lat/length
  })
})

console.log('test', groupedById['116363']['29']['0'])
