var pmx = require('pmx');
var pgClientFactory = require('./lib/clientFactory.js');
var pgStats = require('./lib/stats.js');
var pgActions = require('./lib/actions.js');

pmx.initModule({

  // pid: pmx.resolvePidPaths(['/var/run/postgresql/9.4-main.pid', '/var/run/postgresql/9.3-main.pid', '/var/run/postgresql/9.5-main.pid']),

  // Options related to the display style on Keymetrics
  widget: {

    // Logo displayed
    logo: 'https://docs.dhis2.org/2.34/fr/developer/html/resources/images/dhis2-logo-rgb-positive.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#60798c', '#326892', '#ffffff', '#807C7C'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: true,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['Pemakaian CPU']
    }

  }

}, function (err, conf) {
  var pgClient = pgClientFactory.build(conf);

  // Init metrics refresh loop
  pgStats.init(pgClient);

  // Init actions
  pgActions.init(pgClient);
});
