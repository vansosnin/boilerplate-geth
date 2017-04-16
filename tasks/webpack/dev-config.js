module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                use: 'eslint-loader'
            }
        ]
    }
};
