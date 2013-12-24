var Hue = require('hue.js')

var client = Hue.createClient({
  stationIp: '10.0.1.2',
  appName: 'node-hue-cli', // cheating
})

client.lights(app)

function app(err, result) {
  var l = getNames(result)
  client.on(l.Center)
  client.on(l.Left)

  function getNames(result) {
    var out = {}
    for (k in result) {
      out[result[k].name] = 1 * k
    }
    return out
  }
}
