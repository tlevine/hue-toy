var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  var m = [l.Left,l.Center,l.Right]
  // setInterval(shuffle, 2000)
  // shuffle()
  setHue(l.Left, 0.3, log)

  function setHue(light, newHue, cb) {
    console.log(newHue)
    console.log(toHue(newHue))
    client.state(light, {"hue":toHue(newHue)}, cb)
  }
  function shuffle() {
    var i = 0.4
    setHue(l.Left, (i + 0.1))
    setHue(l.Center, (i + 0.3))
    setHue(l.Right, (i + 0.5))
    console.log(i)
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
