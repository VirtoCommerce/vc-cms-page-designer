const path = require('path');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    entry: {
        'main': './main.ts'
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
            // /****************
            // * PRE-LOADERS
            // *****************/
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     use: 'source-map-loader'
            // },
            // {
            //     enforce: 'pre',
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     use: 'tslint-loader'
            // },

            // /****************
            // * LOADERS
            // *****************/
            // {
            //     test: /\.ts$/,
            //     exclude: [ /node_modules/ ],
            //     use: 'awesome-typescript-loader'
            // }
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {}
};
