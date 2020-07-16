/**
 *  读取文件夹并运行服务
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const sub_app_ath = path.resolve();
const config = require('../config/dev.config');
const type = process.argv.slice(2)[0].split('=')[1];

const sub_apps = fs.readdirSync(sub_app_ath).filter(i => {
  if(type == 'full') {
    return /^subapp|master/.test(i);
  }else {
    return config.active_apps.includes(i);
  }
});

console.log(`即将进入所有模块并启动服务：${JSON.stringify(sub_apps)} ing...`)

const exec = util.promisify(require('child_process').exec);
function start() {
  sub_apps.forEach(async i => {
    console.log(`${i} 开始启动... 全部启动需要时间，请稍加等候，或刷新浏览器即可`)
    const { stdout, stderr } = await exec('npm start', { cwd: path.resolve(i) });
    console.log(i, 'success', stdout)
    console.error(i, 'error', stderr)
  });
  exec(`start http://localhost:${config.ports['master_port']}/`);
};
start();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
