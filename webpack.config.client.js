const configureWebpack = require('./tasks/webpack/configure-webpack');
const buildTarget = require('./tasks/webpack/buildTarget');

module.exports = configureWebpack(__dirname, buildTarget.client);
