const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const stylesProductionConfigurator = require('./styles-prod-config');

module.exports = (directoryname, isPorduction) => {
    const baseConfig = {
        target: 'web'
    };

    const developmentConfig = {
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    // todo: postcss
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]-[local]-[hash:base64:8]'
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true
                            }
                        }
                    ]
                },
            ]
        },
        entry: {
            client: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:3001',
                'webpack/hot/only-dev-server',
                path.join(directoryname, 'client', 'index.js')
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'],
                minChunks: Infinity
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    BUILD_TARGET: JSON.stringify('client')
                }
            })
        ],
        devServer: {
            host: 'localhost',
            port: 3001,
            historyApiFallback: true,
            hot: true
        },
        output: {
            path: path.join(directoryname, 'dist'),
            publicPath: 'http://localhost:3001/'
        }
    };

    const productionConfig = {};

    const stylesProductionConfig = stylesProductionConfigurator(isPorduction);

    if (isPorduction) {
        return webpackMerge(baseConfig, stylesProductionConfig, productionConfig);
    }

    return webpackMerge(baseConfig, developmentConfig);
};
