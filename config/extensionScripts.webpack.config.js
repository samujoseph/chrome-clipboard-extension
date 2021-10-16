const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function () {
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: {
            background: path.resolve(__dirname, '../src/extension-scripts/background.js'),
            contentScript: path.resolve(__dirname, '../src/extension-scripts/contentScript.js'),
        },
        plugins: [
            new CopyPlugin([
                {
                    from: path.resolve(__dirname, '../src/assets/logo'),
                    to: path.resolve(__dirname, '../ext/icons'),
                },
                {
                    from: path.resolve(__dirname, '../src/extension-scripts/manifest.json'),
                    to: path.resolve(__dirname, '../ext/manifest.json'),
                },
            ]),
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, '../ext'),
        },
    }
};
