var pmx = require('pmx');
const os = require('os')
const { exec } = require("child_process")

module.exports = function cpuStat(metrics) {
    const cmd = "ps up $(pidof java) | tail -n1 | tr -s ' ' | cut -f3 -d' '";
    exec(cmd, (err, res) => {
        if (!err) {
            metrics.cpuStat.set(res * 1);
        }
    })

};