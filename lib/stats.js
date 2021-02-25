var pmx = require('pmx');

var cpuStat = require('./stats/cpuStat');

var metrics = {};
var REFRESH_RATE = 10000; // ms
var probe = pmx.probe();

// Init metrics with default values
function initMetrics(conf) {
  metrics.cpuStat = probe.metric({
    name: 'Pemakaian CPU',
    value: 'N/A',
    unit: '%',
    alert: {
      mode: 'threshold-avg',
      value: parseInt(conf.cpu_alert, 10),
      msg: 'Konsumsi CPU diatas 100%',
      cmp: ">"
    }
  });
  metrics.memStat = probe.metric({
    name: 'Pemakaian Memory',
    value: 'N/A',
    unit: '%',
    alert: {
      mode: 'threshold-avg',
      value: parseInt(conf.mem_alert, 10),
      msg: 'Konsumsi Memory diatas 90%',
      cmp: ">"
    }
  });
}

// Refresh metrics
function refreshMetrics(conf) {
  cpuStat(metrics, conf);
  memStat(metrics, conf);
}

function init(conf) {
  initMetrics(conf);
  setInterval(refreshMetrics.bind(this), REFRESH_RATE);
  cpuStat(metrics, conf);
  memStat(metrics, conf);
}

module.exports.init = init;
