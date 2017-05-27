const path = require('path');
const webpack = require('webpack');

module.exports = directoryname => {
    const uiDirectory = path.join(directoryname, 'ui');

    return {
        entry: {
            vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-actions', 'react-router', 'react-router-redux', 'reselect', 'bluebird', 'classnames']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                    include: [path.join(directoryname, 'client'), path.join(directoryname, 'server'), path.join(directoryname, 'ui')],
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
            alias: {
                CoreUI: path.join(uiDirectory, 'components', 'Core'),
                UserSelectors: path.join(uiDirectory, 'selectors', 'userSelectors')
            },
            modules: ['node_modules'],
            extensions: ['.js', '.jsx']
        }
    };
};
