var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  var m = [l.Left,l.Center,l.Right]
  chase(0.4)

  function setHue(light, newHue, cb) {
    client.state(light, {
      "hue":toHue(newHue),
      "sat":100,
      "bri":100
    }, cb)
  }
  function chase(i, inc) {
    if (typeof(inc) === 'undefined') {
      inc = 0.2
    }
    setHue(l.Left, (i + 1 * inc))
    setHue(l.Center, (i + 2 * inc))
    setHue(l.Right, (i + 3 * inc))
    setTimeout(function(){chase(i + 0.25)}, 2 * 1000)
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

function toHue(zero_to_one) {
  return Math.round((zero_to_one % 1) * Math.pow(2, 16))
}
