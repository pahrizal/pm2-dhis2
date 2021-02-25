var pmx = require('pmx');
var _ = require('lodash');
const { exec } = require("child_process")

function initActions() {

  // List DBs
  pmx.action('Restart DHIS', function (reply) {
    exec("/home/silacak/restart-dhis.sh", function (err, results) {
      if (err) {
        return reply(err);
      }
      reply(_.pluck(results));
    })
  });

}

function init() {
  initActions();
}

module.exports.init = init;