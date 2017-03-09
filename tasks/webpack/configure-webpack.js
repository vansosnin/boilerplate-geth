const _ = require('lodash');
const webpackMerge = require('webpack-merge');

const isProduction = _.some(process.argv, _.partial(_.includes, ['-p', '--optimize-minimize', '--optimize-occurence-order']));

module.exports = (directoryname, buildTarget) => {
    const configureBase = require('./webpack-base.config');
    const configureTarget = require(`./webpack-${buildTarget}.config`);

    const baseConfig = configureBase(directoryname);
    const targetConfig = configureTarget(directoryname, isProduction);
    const webpackConfig = webpackMerge(baseConfig, targetConfig);

    return webpackConfig;
};
