const router = require('express').Router();
const _ = require('lodash');
const {drifter} = require('../../public/drifter_data_converted.js')

function convertDecToHour(arr){
  let newArr = arr.map(subArr => {
    return subArr.slice(0,2).concat(subArr[2].split('.')).concat(subArr.slice(3))
  })
  let hourConverted = newArr.map(subArr => {
    return subArr.slice(0,3).concat(Math.round((subArr[3] / 416), 2)).concat(subArr.slice(4))
  })
  let numerifiedArr = hourConverted.map(subArr => {
    return subArr.map(el => {
      return Number(el)
    })
  })
  return numerifiedArr
}

let convertedDrifterToHour = convertDecToHour(drifter)

let septemberDrifters = convertedDrifterToHour.filter(row => {
  return row[1] === 9
})

let drifterObjects = septemberDrifters.map(singleDrifter => {
  return Object.assign({}, {id: singleDrifter[0], month: singleDrifter[1], day: singleDrifter[2], hour:singleDrifter[3],year: singleDrifter[4], lat: singleDrifter[5], long: singleDrifter[6], qualIdx: singleDrifter[7]})
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
      // console.log('test', groupedById[id][day][hour])
      length = groupedById[id][day][hour].length
      hourOuter = hour
      groupedById[id][day][hour] = groupedById[id][day][hour].reduce(function (output, obj) {
        if (!output['long']) {
          output['long'] = obj['long']
        } else {
          output['long'] = (output['long'] + obj['long']) / 2
        }
        if (!output['lat']) {
          output['lat'] = obj['lat']
        } else {
          output['lat'] = (output['lat'] + obj['lat']) / 2
        }
        return output;
      }, {})
    })
    // groupedById[id][day][hourOuter].long = groupedById[id][day][hourOuter].long/length
    // groupedById[id][day][hourOuter].lat = groupedById[id][day][hourOuter].lat/length
  })
})

router.get('/drifters', function (req, res, next) {
  res.json(groupedById)
});

module.exports = {
  router,
  groupedById
}

