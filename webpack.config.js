const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./example/src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'example/output')
    },
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin([
            { from: 'resources' }
        ])
    ]
};
