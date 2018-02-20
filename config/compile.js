const fs = require('fs');

const data = fs.readFileSync('../bin/contract/Lottery.json', 'utf8');

module.exports = JSON.parse(data);
