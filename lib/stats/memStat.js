var pmx = require('pmx');
const os = require('os')
const { exec } = require("child_process")

module.exports = function memStat(metrics, conf) {
    const cmd = "ps up $(pidof java) | tail -n1 | tr -s ' ' | cut -f4 -d' '";
    exec(cmd, (err, res) => {
        if (!err) {
            metrics.memStat.set(res * 1);
        }
    })

};