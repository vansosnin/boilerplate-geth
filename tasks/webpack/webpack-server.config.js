const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const buildTarget = require('./buildTarget');
const stylesProductionConfigurator = require('./styles-prod-config');

module.exports = (directoryname, isPorduction) => {
    const baseConfig = {
        target: 'node',
        output: {
            path: path.join(directoryname, 'dist')
        }
    };

    const developmentConfig = {
        entry: {
            server: [
                'babel-polyfill',
                'webpack/hot/poll?1000',
                path.join(directoryname, 'server', 'index.js')
            ]
        },
        watch: true,
        externals: [nodeExternals({
            whitelist: ['webpack/hot/poll?1000']
        })],
        plugins: [
            new StartServerPlugin('server.js'),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    BUILD_TARGET: JSON.stringify(buildTarget.server)
                }
            })
        ]
    };

    const productionConfig = {};

    const stylesProductionConfig = stylesProductionConfigurator(isPorduction);

    if (isPorduction) {
        return webpackMerge(baseConfig, stylesProductionConfig, productionConfig);
    }

    return webpackMerge(baseConfig, stylesProductionConfig, developmentConfig);
};
