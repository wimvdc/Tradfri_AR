var express         = require('express');
var router          = express.Router();
var mcache          = require('memory-cache');
var config          = require('../config');
var tradfri         = require('node-tradfri-argon').create({
  coapClientPath: config.tradfri.coapClientPath,
  securityId:     config.tradfri.securityId,
  hubIpAddress:   config.tradfri.hubIpAddress
});

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}

router.get('/all', cache(5), function(req, res) {
  tradfri.getDevices()
  .then((devices) => {
      res.header("Content-Type", "application/json");
      res.send(devices);
  })
  .catch((error) => {
    res.send('ERROR: ' + error);
  });
});

router.post ('/update', function(req, res) {
    getDeviceIdByName(req.body.name).then(function(result) {
      tradfri.setDeviceState(result, {
        state       : req.body.state,
        color       : req.body.color,
        brightness  : req.body.brightness
      }).then( info => {
        res.send('Success!');
      }).catch((error) => {
        res.send('ERROR: ' + error);
      });
    });
});

function getDeviceIdByName(name){

  return new Promise(function(resolve, reject) {
    tradfri.getDevices()
    .then((devices) => {
      devices.forEach((device) => {
        if(device.name == name){
            resolve(device.id);
          }
        });
        reject(null);
    })
  });

}

module.exports = router;
