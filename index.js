var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  var m = [l.Left,l.Center,l.Right]
  console.log(toHex(82, 82, 23))
}

function getNames(result) {
  var out = {}
  for (k in result) {
    out[result[k].name] = 1 * k
  }
  return out
}

function toHex(r,g,b) {
  return [r,g,b].map(oneChannel)
  function oneChannel(decimal) {
    return (decimal % 255).toString(16)
  }
}
