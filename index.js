var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  var m = [l.Left,l.Center,l.Right]
  setHue(l.Left, 0.1)

  function setHue(newHue, cb) {
    client.state(l.Left, {hue:newHue}, cb)
  }
}

function getNames(result) {
  var out = {}
  for (k in result) {
    out[result[k].name] = 1 * k
  }
  return out
}

function log(x,y) {
  console.log(x,y)
}

console.log(hue(0.3))

function hue(zero_to_one) {
  return Math.round((zero_to_one % 1) * Math.pow(2, 16))
}
