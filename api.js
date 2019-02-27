let api = require('./lib');
let config = require('config');
config.static = `${__dirname}/public`;

api.start(config);