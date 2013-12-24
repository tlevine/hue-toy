var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  var m = [l.Left,l.Center,l.Right]
  shuffle(0.4)

  function setHue(light, newHue, cb) {
    client.state(light, {
      "hue":toHue(newHue),
      "sat":50,
      "bri":50,
    }, cb)
  }
  function shuffle(i) {
    setHue(l.Left, (i + 0.1))
    setHue(l.Center, (i + 0.2))
    setHue(l.Right, (i + 0.3))
    console.log(i)
    setTimeout(function(){shuffle(i + 0.25)}, 2 * 1000)
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
