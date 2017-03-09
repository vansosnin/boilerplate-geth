const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = directoryname => ({
    entry: {
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'bluebird']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: [
                    path.join(directoryname, 'client'),
                    path.join(directoryname, 'server'),
                    path.join(directoryname, 'components')
                ],
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'chunks/[name].[chunkhash].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'bluebird',
            'global.Promise': 'bluebird',
            React: 'react',
            ReactDom: 'react-dom'
        })
    ],
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    }
});
