var pmx = require('pmx');

var cpuStat = require('./stats/cpuStat');

var metrics = {};
var REFRESH_RATE = 10000; // ms
var probe = pmx.probe();

// Init metrics with default values
function initMetrics() {
  metrics.cpuStat = probe.metric({
    name: 'Pemakaian CPU',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 90,
      msg: 'Konsumsi CPU diatas 90%',
      cmp: ">"
    }
  });
}

// Refresh metrics
function refreshMetrics() {
  cpuStat(metrics);
}

function init() {
  initMetrics();
  setInterval(refreshMetrics.bind(this), REFRESH_RATE);
  cpuStat(metrics);
}

module.exports.init = init;
