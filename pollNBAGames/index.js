const fs = require('fs');
const path = require('path');
const SSH = require('simple-ssh');

exports.handler = function(evt, context, callback) {
  const ssh = new SSH({
    host: process.env.EC2_HOSTNAME,
    user: process.env.EC2_USER,
    key: fs.readFileSync(path.resolve(__dirname, 'hunch_instance_key.pem')),
  });

  console.info('SSH connection established.');
  ssh
    .exec('cd ~/hunch/current/api && yarn run poll-games', {
      err: console.error.bind(console),
      out: console.log.bind(console),
      exit: code => callback(null, `Completed script with code ${code}`),
    })
    .start();
};
